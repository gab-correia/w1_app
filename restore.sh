#!/bin/bash

# Nome do container do postgres
CONTAINER_NAME="w1_app_postgres_1"

# Nome do banco de dados
DB_NAME="resumos"

# Usuário do banco
DB_USER="admin"

# Pasta onde estão os backups
BACKUP_DIR="./backend/database"

# Listar os arquivos de backup
echo "Arquivos de backup disponíveis:"
ls $BACKUP_DIR | grep backup

# Perguntar qual arquivo restaurar
echo ""
read -p "Digite o nome do arquivo de backup para restaurar (ex: backup-2025-05-21_11-35-50.sql): " FILE_NAME

# Verificar se o arquivo existe
if [ ! -f "$BACKUP_DIR/$FILE_NAME" ]; then
  echo "Arquivo não encontrado!"
  exit 1
fi

# Rodar o restore
echo "Restaurando backup..."
cat $BACKUP_DIR/$FILE_NAME | docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME

echo "Backup $FILE_NAME restaurado com sucesso!"
