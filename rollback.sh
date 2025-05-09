#!/bin/bash

APP_DIR="/home/hargile.eu"
DEPLOYMENTS_DIR="$APP_DIR/deployments"
ROLLBACK_LOG="$DEPLOYMENTS_DIR/rollback_history"
CURRENT_VERSION=$(cat $DEPLOYMENTS_DIR/current_version)

log_message() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

perform_rollback() {
  local target_version="$1"
  local reason="$2"

  log_message "Rolling back from $CURRENT_VERSION to $target_version"
  log_message "Reason: $reason"

  rm -f $DEPLOYMENTS_DIR/current
  ln -s $DEPLOYMENTS_DIR/versions/"$target_version" $DEPLOYMENTS_DIR/current

  # shellcheck disable=SC2164
  cd $DEPLOYMENTS_DIR/current/.docker
  docker compose down
  docker compose up -d

  echo "$target_version" > $DEPLOYMENTS_DIR/current_version
  echo "ROLLBACK: from $CURRENT_VERSION to $target_version at $(date) - $reason" >> $ROLLBACK_LOG

  log_message "Rollback completed successfully"
}

list_versions() {
  log_message "Available versions:"

  # shellcheck disable=SC2155
  local versions=$(ls -t $DEPLOYMENTS_DIR/versions)
  local count=1

  echo "0) Cancel"
  for version in $versions; do
    # shellcheck disable=SC2155
    local deploy_date=$(stat -c "%y" $DEPLOYMENTS_DIR/versions/"$version" | cut -d. -f1)
    echo "$count) $version - $deploy_date"
    ((count++))
  done
}

if [ -n "$1" ]; then
  TARGET_VERSION="$1"

  if [ ! -d "$DEPLOYMENTS_DIR/versions/$TARGET_VERSION" ]; then
    log_message "Error: Version $TARGET_VERSION not found!"
    exit 1
  fi

  REASON="${2:-Manual rollback}"
  perform_rollback "$TARGET_VERSION" "$REASON"
else
  if [ -f "$DEPLOYMENTS_DIR/previous_version" ]; then
    PREVIOUS_VERSION=$(cat $DEPLOYMENTS_DIR/previous_version)
    log_message "Current version: $CURRENT_VERSION"
    log_message "Previous version: $PREVIOUS_VERSION"

    echo -n "Roll back to previous version? [y/N/list] "
    read -r CHOICE

    case $CHOICE in
      [Yy]*)
        perform_rollback "$PREVIOUS_VERSION" "Manual rollback"
        ;;
      [Ll]*)
        list_versions

        echo -n "Select version to roll back to (0 to cancel): "
        read -r VERSION_INDEX

        if [ "$VERSION_INDEX" -eq 0 ]; then
          log_message "Rollback cancelled"
          exit 0
        fi

        # shellcheck disable=SC2012
        SELECTED_VERSION=$(ls -t $DEPLOYMENTS_DIR/versions | sed -n "${VERSION_INDEX}p")

        if [ -n "$SELECTED_VERSION" ]; then
          echo -n "Enter reason for rollback: "
          read -r REASON
          perform_rollback "$SELECTED_VERSION" "${REASON:-Manual selection}"
        else
          log_message "Invalid selection"
          exit 1
        fi
        ;;
      *)
        log_message "Rollback cancelled"
        ;;
    esac
  else
    log_message "No previous version found for rollback!"
    log_message "Available versions:"
    list_versions
  fi
fi
