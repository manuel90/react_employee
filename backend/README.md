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
1. Open adminer: [localhost:8002](http://localhost:8002/?pgsql=reactexpress_db) (Credentials: User: <b>dev</b> Password: <b>dev</b> Database: <b>reactexpress_db_demo</b> Server: <b>reactexpress_db</b>)

# Import Demo data ----------

Below It's explain how to import the demo data for this repo using [Adminer](https://www.adminer.org/) but, you can use any other database management.

1. Open adminer: [localhost:8002](http://localhost:8002/?pgsql=reactexpress_db) (Credentials: User: <b>dev</b> Password: <b>dev</b> Database: <b>reactexpress_db_demo</b> Server: <b>reactexpress_db</b>)
1. Click on the database <b>reactexpress_db_demo</b>
1. then, at the right side click on the <b>import</b> link.
1. Finally, load the <b>[inserts.sql](/backend/data/inserts.sql)</b> file you can find it here: [/backend/data/inserts.sql](/backend/data/inserts.sql)