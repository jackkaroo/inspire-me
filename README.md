# inspire-me

1. Install postgres: https://www.postgresql.org/download/
2. Install all packages: **npm i**
3. Create new file with name .env and paste lines from example.env into it
4. Inside .env file
5. Run migrations: **npx prisma migrate dev --schema ./src/db/prisma/schema.prisma** (You have to run migrations to generate/alter PostgreSQL tables)
6. Generate models: **npm run generate** (You have to run generate to create ORM classes based on SQL schema describe in src/db/prisma/schema.prisma)
