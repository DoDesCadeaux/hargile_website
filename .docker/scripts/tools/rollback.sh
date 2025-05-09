#!/bin/bash

set -e

echo "=== Gestion de rollback ==="

APP_DIR=/home/hargile.eu
DEPLOYMENTS_DIR=$APP_DIR/deployments
ROLLBACK_LOG="$DEPLOYMENTS_DIR/rollback_history"

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

  rm -f $DEPLOYMENTS_DIR/current
  ln -s $DEPLOYMENTS_DIR/versions/"$target_version" $DEPLOYMENTS_DIR/current

  cd $DEPLOYMENTS_DIR/current/.docker
  export DEPLOY_ID=$target_version
  docker compose down
  docker compose up -d

  echo "$target_version" > $DEPLOYMENTS_DIR/current_version
  echo "ROLLBACK: from $CURRENT_VERSION to $target_version at $(date) - $reason" >> $ROLLBACK_LOG

  echo "✅ Rollback terminé avec succès vers $target_version"
}

if [ -n "$1" ]; then
  TARGET_VERSION="$1"

  if [ ! -d "$DEPLOYMENTS_DIR/versions/$TARGET_VERSION" ]; then
    echo "❌ Erreur: Version $TARGET_VERSION introuvable!"
    exit 1
  fi

  REASON="${2:-Rollback manuel}"
  perform_rollback "$TARGET_VERSION" "$REASON"
else
  if [ -f "$DEPLOYMENTS_DIR/previous_version" ]; then
    PREVIOUS_VERSION=$(cat $DEPLOYMENTS_DIR/previous_version)
    echo "Version précédente: $PREVIOUS_VERSION"

    # shellcheck disable=SC2162
    read -p "Effectuer un rollback vers la version précédente? [y/N/list] " CHOICE

    case $CHOICE in
      [Yy]*)
        perform_rollback "$PREVIOUS_VERSION" "Rollback manuel"
        ;;
      [Ll]*)
        echo "Versions disponibles:"
        echo "0) Annuler"

        # shellcheck disable=SC2207
        VERSIONS=($(ls -t $DEPLOYMENTS_DIR/versions))
        for i in "${!VERSIONS[@]}"; do
          DEPLOY_DATE=$(stat -c "%y" $DEPLOYMENTS_DIR/versions/"${VERSIONS[$i]}" | cut -d. -f1)
          echo "$((i+1))) ${VERSIONS[$i]} - $DEPLOY_DATE"
        done

        # shellcheck disable=SC2162
        read -p "Choisir une version (0 pour annuler): " VERSION_INDEX

        if [ "$VERSION_INDEX" -eq 0 ]; then
          echo "Rollback annulé"
          exit 0
        fi

        SELECTED_VERSION="${VERSIONS[$((VERSION_INDEX-1))]}"

        if [ -n "$SELECTED_VERSION" ]; then
          # shellcheck disable=SC2162
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
    echo "❌ Aucune version précédente trouvée pour le rollback!"

    echo "Versions disponibles:"
    # shellcheck disable=SC2207
    VERSIONS=($(ls -t $DEPLOYMENTS_DIR/versions))
    for i in "${!VERSIONS[@]}"; do
      DEPLOY_DATE=$(stat -c "%y" $DEPLOYMENTS_DIR/versions/"${VERSIONS[$i]}" | cut -d. -f1)
      echo "$((i+1))) ${VERSIONS[$i]} - $DEPLOY_DATE"
    done
  fi
fi
