set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    create user bookolog with password 'masterkey';
    create database bookolog;
    grant all privileges on database bookolog to bookolog;
EOSQL

psql -U bookolog -d bookolog -f /docker-entrypoint-initdb.d/bookolog_test.sql.back