FROM postgres

COPY db/db.sql docker-entrypoint-initdb.d/

RUN chmod a+r /docker-entrypoint-initdb.d/*