Backend Express
====================

Propac promohub project.


## Installation using Docker
It's required: 

* [Docker +20](https://www.docker.com/)
* [Docker compose +2.5.1](https://docs.docker.com/compose/install/other/)
* This project uses Node 22.11.0


Steps:

1. Ensure ports 8001, 8002 are not running other services.
1. `cd {your project folder}`
1. Create the .env file run: `cp .env.example .env`
1. `sudo docker-compose build --no-cache`
1. `sudo docker-compose up`
1. Finally, go to [localhost:8001](http://localhost:8001)
1. Open adminer: [localhost:8002](http://localhost:8002/?pgsql=reactexpress_db) (Credentials: User: dev Password: dev)

# Import Demo data ----------

1. Open adminer: [localhost:8002](http://localhost:8002/?pgsql=reactexpress_db) (Credentials: User: dev Password: dev) (Server: reactexpress_db)
1. Click on the database <b>reactexpress_db_demo</b>
1. then, at the right side click on the <b>import</b> link.
1. Finally, load the <b>[inserts.sql](/data/inserts.sql)</b> file you can find it here: [/data/inserts.sql](/data/inserts.sql)