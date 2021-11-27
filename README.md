# inspire-me

1. Install postgres and create database:
   username: postgres;
   password: postgres;
   dbname: InspireDB;

2. Install all packages:
npm i
   
3. Run migrations:
npx prisma migrate dev --name second --schema ./src/db/prisma/schema.prisma
