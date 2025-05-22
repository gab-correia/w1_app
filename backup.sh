#!/bin/bash

# Nome do container do postgres
CONTAINER_NAME="w1_app_postgres_1"

# Nome do banco de dados
DB_NAME="resumos"

# Usuário do banco
DB_USER="admin"

# Pasta onde o backup vai ser salvo
BACKUP_DIR="./backend/database"

# Nome do arquivo com data e hora
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
FILE_NAME="backup-$DATE.sql"

# Comando de backup
echo "Iniciando backup..."
docker exec -t $CONTAINER_NAME pg_dump -U $DB_USER -d $DB_NAME > $BACKUP_DIR/$FILE_NAME

echo "Backup criado em $BACKUP_DIR/$FILE_NAME"
