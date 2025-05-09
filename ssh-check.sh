#!/bin/bash

HOST="109.176.197.172"
USER="root"
KEY_PATH="$HOME/.ssh/github_actions_deploy"

echo "=== SSH Connection Test ==="
echo "Host: $HOST"
echo "User: $USER"
echo "Key: $KEY_PATH"

echo -e "\n=== Testing SSH connection ==="
ssh -i "$KEY_PATH" -v "$USER@$HOST" exit
RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo -e "\n✅ SSH connection successful!"
else
  echo -e "\n❌ SSH connection failed with exit code $RESULT"

  # Vérifications supplémentaires
  echo -e "\n=== Checking key permissions ==="
  ls -la "$KEY_PATH"
  echo -e "\nFix with: chmod 600 $KEY_PATH"

  echo -e "\n=== Checking known_hosts ==="
  if grep -q "$HOST" "$HOME/.ssh/known_hosts"; then
    echo "Host found in known_hosts"
  else
    echo "Host not found in known_hosts"
    echo "Fix with: ssh-keyscan -H $HOST >> $HOME/.ssh/known_hosts"
  fi

  echo -e "\n=== Checking SSH agent ==="
  ssh-add -l
  echo -e "\nAdd key with: ssh-add $KEY_PATH"
fi
