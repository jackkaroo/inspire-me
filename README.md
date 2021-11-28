# inspire-me

1. Install PostgreSQL if not installed: https://www.postgresql.org/download/
2. Install Node if not installed: https://nodejs.org/uk/download/
3. From project folder install all packages with command: **npm i**
4. Create new file with name _.env_ and paste lines from _example.env_ into it
5. Inside _.env_ file specify correct credentials in _DATABASE_URL_
6. From project folder create and execute migrations with command: **npx prisma migrate dev --schema ./src/db/prisma/schema.prisma** 
   (You have to run migrations to generate/alter PostgreSQL database tables based on relational schema described in src/db/prisma/schema.prisma)
7. From project folder generate ORM models with command: **npm run generate** 
   (You have to run generate to generate/alter ORM classes that are based on relational schema described in src/db/prisma/schema.prisma)

More about Prisma ORM: https://www.prisma.io/
