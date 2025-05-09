#!/bin/bash
# Ce script lance l'application déployée
set -e

DEPLOY_ID=$1

echo "=== Démarrage du déploiement $DEPLOY_ID ==="

# Configuration des chemins
APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments

# Vérifier que le déploiement existe
if [ ! -d "$DEPLOYMENTS_DIR/current" ]; then
  echo "ERREUR: Déploiement actuel introuvable!"
  exit 1
fi

# Naviguer vers le répertoire de l'application
cd $DEPLOYMENTS_DIR/current

# Installation des dépendances et build
echo "Installation des dépendances Node.js..."
npm ci

echo "Construction de l'application Next.js..."
npm run build
echo "Build terminé avec succès!"

# Naviguer vers le répertoire .docker
cd $DEPLOYMENTS_DIR/current/.docker

# Démarrer les conteneurs
echo "Démarrage des conteneurs Docker..."
DEPLOY_ID=$DEPLOY_ID docker compose down || true
DEPLOY_ID=$DEPLOY_ID docker compose up -d --build

# Enregistrer le déploiement
echo $DEPLOY_ID > $DEPLOYMENTS_DIR/current_version
echo "$DEPLOY_ID deployed at $(date)" >> $DEPLOYMENTS_DIR/deploy_history
echo "Déploiement enregistré"

# Letsencrypt sera configuré plus tard si nécessaire

echo "=== Démarrage terminé avec succès ==="
