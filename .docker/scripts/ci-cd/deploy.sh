#!/bin/bash
set -e

# Récupérer l'ID de déploiement des arguments
DEPLOY_ID=$1
[ -z "$DEPLOY_ID" ] && DEPLOY_ID=$(date +%Y%m%d%H%M%S)-$(git rev-parse --short HEAD)

# Configuration des chemins
APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments
SCRIPTS_DIR=$(dirname "$(readlink -f "$0")")
# shellcheck disable=SC2034
CONFIG_DIR="$SCRIPTS_DIR/../../config"

echo "=== Déploiement $DEPLOY_ID ==="

mkdir -p $DEPLOYMENTS_DIR/versions

if [ -L $DEPLOYMENTS_DIR/current ]; then
  PREVIOUS_VERSION=$(readlink $DEPLOYMENTS_DIR/current | xargs basename)
  echo "$PREVIOUS_VERSION" > $DEPLOYMENTS_DIR/previous_version
  echo "Version précédente: $PREVIOUS_VERSION"
fi

mkdir -p $DEPLOYMENTS_DIR/versions/"$DEPLOY_ID"
tar -xzf /tmp/deploy-src.tar.gz -C $DEPLOYMENTS_DIR/versions/"$DEPLOY_ID"
echo "Fichiers extraits dans $DEPLOYMENTS_DIR/versions/$DEPLOY_ID"

rm -f $DEPLOYMENTS_DIR/current
ln -s $DEPLOYMENTS_DIR/versions/"$DEPLOY_ID" $DEPLOYMENTS_DIR/current
echo "Lien symbolique mis à jour: current -> $DEPLOY_ID"

cd $DEPLOYMENTS_DIR/current/.docker

if [ ! -f "Dockerfile.ols" ]; then
  cat > Dockerfile.ols << 'EOF'
FROM litespeedtech/openlitespeed:latest

# Installer les outils de diagnostic
RUN apt-get update && apt-get install -y curl iputils-ping dnsutils netcat-openbsd net-tools

ENTRYPOINT ["/entrypoint.sh"]
EOF
  echo "Dockerfile.ols créé avec outils de diagnostic"
fi

mkdir -p scripts/ci-cd scripts/tools config/ols

if ! grep -q 'depends_on:' docker-compose.yml; then
  sed -i '/nextjs:/a\    depends_on:\n      - openlitespeed' docker-compose.yml
  echo "Dépendance ajoutée: nextjs dépend de openlitespeed"
fi

sed -i 's|image: litespeedtech/openlitespeed:latest|build: \n      context: .\n      dockerfile: Dockerfile.ols|g' docker-compose.yml
echo "docker-compose.yml modifié pour utiliser Dockerfile.ols"

if ! grep -q 'ports:' docker-compose.yml | grep -A2 nextjs; then
  sed -i '/nextjs:/a\    ports:\n      - "3000:3000"' docker-compose.yml
  echo "Port 3000 exposé pour Next.js"
fi

docker compose down
echo "Conteneurs arrêtés"

DEPLOY_ID=$DEPLOY_ID docker compose up -d --build
echo "Conteneurs démarrés avec DEPLOY_ID=$DEPLOY_ID"

# shellcheck disable=SC2086
echo $DEPLOY_ID > $DEPLOYMENTS_DIR/current_version
echo "$DEPLOY_ID deployed at $(date)" >> $DEPLOYMENTS_DIR/deploy_history
echo "Déploiement enregistré"

rm /tmp/deploy-src.tar.gz
echo "Fichier d'archive nettoyé"

cd $DEPLOYMENTS_DIR/versions
# shellcheck disable=SC2012
ls -t | tail -n +6 | xargs rm -rf
echo "Anciens déploiements nettoyés"

echo "=== Déploiement réussi: $DEPLOY_ID ==="
