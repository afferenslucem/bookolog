set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    create user bookolog with password 'masterkey';
    create user bookolog_readonly with password 'masterkey';
    create database bookolog;
    grant all privileges on database bookolog to bookolog;
EOSQL
psql -v ON_ERROR_STOP=1 --username bookolog --dbname bookolog -f /docker-entrypoint-initdb.d/dump.bak