#!/bin/bash

# Exécuter le script de configuration après le démarrage du serveur
(sleep 30 && /usr/src/lsws-config/config.sh) &

# Exécuter la commande par défaut du conteneur
exec "$@"
