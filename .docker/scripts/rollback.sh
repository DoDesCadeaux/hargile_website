#!/bin/bash
set -e

# Mode de rollback (auto ou manuel)
ROLLBACK_MODE=$1
ROLLBACK_REASON=$2

echo "=== Gestion de rollback ==="

# Configuration des chemins
APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments
ROLLBACK_LOG="$DEPLOYMENTS_DIR/rollback_history"

# Vérifier si une version actuelle existe
if [ -f "$DEPLOYMENTS_DIR/current_version" ]; then
  CURRENT_VERSION=$(cat $DEPLOYMENTS_DIR/current_version)
  echo "Version actuelle: $CURRENT_VERSION"
else
  echo "❌ Aucune version actuelle trouvée"
  exit 1
fi

perform_rollback() {
  local target_version="$1"
  local reason="$2"

  echo "Rollback de $CURRENT_VERSION vers $target_version"
  echo "Raison: $reason"

  # Mettre à jour le lien symbolique
  rm -f $DEPLOYMENTS_DIR/current
  ln -sf $DEPLOYMENTS_DIR/versions/"$target_version" $DEPLOYMENTS_DIR/current

  # Redémarrer les conteneurs
  cd $DEPLOYMENTS_DIR/current/.docker
  export DEPLOY_ID=$target_version
  docker compose down
  docker compose up -d

  # Enregistrer le rollback
  echo "$target_version" > $DEPLOYMENTS_DIR/current_version
  echo "ROLLBACK: from $CURRENT_VERSION to $target_version at $(date) - $reason" >> $ROLLBACK_LOG

  echo "✅ Rollback terminé avec succès vers $target_version"
}

# Fonction pour lister les versions disponibles
list_versions() {
  echo "Versions disponibles:"
  VERSIONS=($(ls -t $DEPLOYMENTS_DIR/versions))
  for i in "${!VERSIONS[@]}"; do
    DEPLOY_DATE=$(stat -c "%y" $DEPLOYMENTS_DIR/versions/"${VERSIONS[$i]}" | cut -d. -f1)
    echo "$((i+1))) ${VERSIONS[$i]} - $DEPLOY_DATE"
  done
}

# Rollback automatique
if [ "$ROLLBACK_MODE" = "auto" ]; then
  # Vérifier si une version précédente existe
  if [ -f "$DEPLOYMENTS_DIR/previous_version" ]; then
    PREVIOUS_VERSION=$(cat $DEPLOYMENTS_DIR/previous_version)
    echo "Version précédente trouvée: $PREVIOUS_VERSION"

    # Effectuer le rollback
    perform_rollback "$PREVIOUS_VERSION" "${ROLLBACK_REASON:-Rollback automatique}"
  else
    echo "❌ Aucune version précédente trouvée pour le rollback automatique!"
    exit 1
  fi
# Rollback manuel avec version spécifiée
elif [ -n "$ROLLBACK_MODE" ] && [ "$ROLLBACK_MODE" != "list" ]; then
  TARGET_VERSION="$ROLLBACK_MODE"

  # Vérifier si la version cible existe
  if [ ! -d "$DEPLOYMENTS_DIR/versions/$TARGET_VERSION" ]; then
    echo "❌ Erreur: Version $TARGET_VERSION introuvable!"
    list_versions
    exit 1
  fi

  # Effectuer le rollback
  perform_rollback "$TARGET_VERSION" "${ROLLBACK_REASON:-Rollback manuel}"
# Mode interactif
else
  # Vérifier si une version précédente existe
  if [ -f "$DEPLOYMENTS_DIR/previous_version" ]; then
    PREVIOUS_VERSION=$(cat $DEPLOYMENTS_DIR/previous_version)
    echo "Version précédente: $PREVIOUS_VERSION"

    read -p "Effectuer un rollback vers la version précédente? [y/N/list] " CHOICE

    case $CHOICE in
      [Yy]*)
        perform_rollback "$PREVIOUS_VERSION" "Rollback manuel interactif"
        ;;
      [Ll]*)
        echo "0) Annuler"
        list_versions

        read -p "Choisir une version (0 pour annuler): " VERSION_INDEX

        if [ "$VERSION_INDEX" -eq 0 ]; then
          echo "Rollback annulé"
          exit 0
        fi

        VERSIONS=($(ls -t $DEPLOYMENTS_DIR/versions))
        SELECTED_VERSION="${VERSIONS[$((VERSION_INDEX-1))]}"

        if [ -n "$SELECTED_VERSION" ]; then
          read -p "Raison du rollback: " REASON
          perform_rollback "$SELECTED_VERSION" "${REASON:-Sélection manuelle}"
        else
          echo "❌ Sélection invalide"
          exit 1
        fi
        ;;
      *)
        echo "Rollback annulé"
        ;;
    esac
  else
    echo "❌ Aucune version précédente trouvée!"
    echo "Versions disponibles pour rollback manuel:"

    list_versions

    read -p "Choisir une version (0 pour annuler): " VERSION_INDEX

    if [ "$VERSION_INDEX" -eq 0 ]; then
      echo "Rollback annulé"
      exit 0
    fi

    VERSIONS=($(ls -t $DEPLOYMENTS_DIR/versions))
    SELECTED_VERSION="${VERSIONS[$((VERSION_INDEX-1))]}"

    if [ -n "$SELECTED_VERSION" ]; then
      read -p "Raison du rollback: " REASON
      perform_rollback "$SELECTED_VERSION" "${REASON:-Sélection manuelle}"
    else
      echo "❌ Sélection invalide"
      exit 1
    fi
  fi
fi
