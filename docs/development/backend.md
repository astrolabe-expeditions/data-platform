# Backend (Supabase)

The backend is responsible for storing all data and providing a way for the frontend to access it. We use **Supabase**, which is an open-source alternative to Firebase.

## What is Supabase?

[Supabase](https://supabase.com/) provides:
- **PostgreSQL database** - A powerful database for storing structured data
- **Automatic REST API** - Supabase automatically creates an API from your database schema
- **Authentication** - Built-in user login and security

The [frontend](./frontend.md) and the [ingestion pipeline](./ingestion.md) uses this REST API to read and write data without needing to write SQL queries directly.

## Database Schema

The database structure is defined in the `supabase/schemas/` folder. Each file represents a table or set of related tables. There is an interactive schema onto Supabase dashboard.

### Update the schema

When you want to add or to update a table, you need to create a migration.

**What are migrations?** Migrations are files that track changes to your database structure. Think of them as version control for your database.

**1. Modify database schema**
You modify files in `supabase/schemas/` to

**2. Generate a migration file:**
```bash
yarn supabase db diff -f describe_your_migration
```
- Replace `describe_your_migration` with a short description (e.g., `add_location_to_stations`)
- This creates a new SQL file in `supabase/migrations/`

**2. Apply the migration to your local database:**
```bash
yarn supabase migration up
```

**3. Update seed data:**
```bash
yarn seed:sync
```
- This ensures your test data stays in sync with the new schema

**4. Update TypeScript types:**
```bash
yarn type:generate
```
- This gives you autocomplete for the new database structure in your code

**5. Format files:**
```bash
yarn format
```

### Deploying an update to production

When your pull request is merged to the `main` branch, the CI (Continuous Integration) will automatically:
- Apply your migration to the production database
- No manual deployment needed!

## Seeding (Adding Test Data)

**What is seeding?** Seeding means adding sample/test data to your local database so you can develop and test features without real data.

### Generating Seeds

To create seed data from your current local database:

```bash
yarn seed:generate
```

**When to use this:**
- After adding new tables or columns
- When you need sample data to test new features
- To help other developers get started quickly with realistic data

**Note:** Seed files are located in `supabase/seeds/`
