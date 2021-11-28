# inspire-me

1. Install PostgreSQL if not installed: https://www.postgresql.org/download/
2. Install Node: https://nodejs.org/uk/download/
3. Inside project folder install all packages with: **npm i**
4. Create new file with name _.env_ and paste lines from _example.env_ into it
5. Inside _.env_ file insert correct credentials in _DATABASE_URL_
6. Run migrations: **npx prisma migrate dev --schema ./src/db/prisma/schema.prisma** (You have to run migrations to generate/alter PostgreSQL database tables)
7. Generate ORM models: **npm run generate** (You have to run generate to create/update ORM classes that are based on SQL schema described in src/db/prisma/schema.prisma)

More about Prisma ORM: https://www.prisma.io/
