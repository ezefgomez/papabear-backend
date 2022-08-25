docker run --detach --name mariadb_server \
-p 3306:3306 \
--env MARIADB_USER=root \
--env MARIADB_PASSWORD=root_password \
--env MARIADB_ROOT_PASSWORD=root_password \
 mariadb:latest