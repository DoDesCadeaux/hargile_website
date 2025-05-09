#!/bin/bash
set -e
set -x

# Initialize logging
LOG_FILE="/home/hargile.eu/deployments/rollback.log"
echo "=== Rollback $(date) ===" >> "$LOG_FILE"

# Mode de rollback (auto ou version spécifique)
ROLLBACK_MODE=$1
ROLLBACK_REASON=${2:-"Rollback manuel"}

echo "Gestion de rollback: Mode=$ROLLBACK_MODE, Raison=$ROLLBACK_REASON" | tee -a "$LOG_FILE"

# Configuration des chemins
APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments

# Vérifier si une version actuelle existe
if [ ! -f "$DEPLOYMENTS_DIR/current_version" ]; then
  echo "❌ Aucune version actuelle trouvée" | tee -a "$LOG_FILE"
  exit 1
fi
CURRENT_VERSION=$(cat "$DEPLOYMENTS_DIR/current_version")
echo "Version actuelle: $CURRENT_VERSION" | tee -a "$LOG_FILE"

perform_rollback() {
  local target_version="$1"
  local reason="$2"

  if [ ! -d "$DEPLOYMENTS_DIR/versions/$target_version" ]; then
    echo "❌ Version $target_version introuvable!" | tee -a "$LOG_FILE"
    exit 1
  fi

  echo "Rollback de $CURRENT_VERSION vers $target_version" | tee -a "$LOG_FILE"
  echo "Raison: $reason" | tee -a "$LOG_FILE"

  # Mettre à jour le lien symbolique
  rm -f "$DEPLOYMENTS_DIR/current"
  ln -sf "$DEPLOYMENTS_DIR/versions/$target_version" "$DEPLOYMENTS_DIR/current"

  # Redémarrer les conteneurs
  cd "$DEPLOYMENTS_DIR/current/.docker"
  export DEPLOY_ID=$target_version
  docker compose down
  docker compose up -d

  # Enregistrer le rollback
  echo "$target_version" > "$DEPLOYMENTS_DIR/current_version"
  echo "ROLLBACK: from $CURRENT_VERSION to $target_version at $(date) - $reason" >> "$LOG_FILE"

  echo "✅ Rollback terminé avec succès vers $target_version" | tee -a "$LOG_FILE"
}

# Rollback automatique
if [ "$ROLLBACK_MODE" = "auto" ]; then
  if [ -f "$DEPLOYMENTS_DIR/previous_version" ]; then
    PREVIOUS_VERSION=$(cat "$DEPLOYMENTS_DIR/previous_version")
    perform_rollback "$PREVIOUS_VERSION" "$ROLLBACK_REASON"
  else
    echo "❌ Aucune version précédente trouvée!" | tee -a "$LOG_FILE"
    exit 1
  fi
# Rollback manuel avec version spécifiée
elif [ -n "$ROLLBACK_MODE" ]; then
  perform_rollback "$ROLLBACK_MODE" "$ROLLBACK_REASON"
else
  echo "❌ Mode de rollback non spécifié!" | tee -a "$LOG_FILE"
  exit 1
fi
