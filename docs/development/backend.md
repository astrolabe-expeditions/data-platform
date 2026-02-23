# Backend (Supabase)

The backend is responsible for storing all the expedition data and providing a way for the frontend to access it. We use **Supabase**, which is an open-source alternative to Firebase.

## What is Supabase?

[Supabase](https://supabase.com/) provides:
- **PostgreSQL database** - A powerful database for storing structured data
- **Automatic REST API** - Supabase automatically creates an API from your database schema
- **Authentication** - Built-in user login and security
- **Real-time subscriptions** - Get notified when data changes

The frontend (built with Refine) uses this REST API to read and write data without needing to write SQL queries directly.

## Database Schema

The database structure is defined in the `supabase/schemas/` folder. Each file represents a table or set of related tables (stations, datasets, instruments, etc.).

## Migrations (Updating the Database)

**What are migrations?** Migrations are files that track changes to your database structure. Think of them as version control for your database.

### Creating a Migration

When you modify files in `supabase/schemas/`, follow these steps:

**1. Generate a migration file:**
```bash
yarn supabase db diff -f describe_your_migration
```
- Replace `describe_your_migration` with a short description (e.g., `add_location_to_stations`)
- This creates a new SQL file in `supabase/migrations/`

**2. Apply the migration to your local database:**
```bash
yarn supabase migration up
```

**3. Update seed data (if needed):**
```bash
yarn seed:sync
```
- This ensures your test data stays in sync with the new schema

**4. Update TypeScript types:**
```bash
yarn type:generate
```
- This gives you autocomplete for the new database structure in your code

### Deploying to Production

When your pull request is merged to the `main` branch, the CI (Continuous Integration) will automatically:
- Apply your migration to the production database
- No manual deployment needed!

## TypeScript Types

**Why do we need types?** TypeScript types help catch errors before you run your code by telling your editor what shape your data should have.

### Generating Types from the Database

After making database changes, regenerate types:

```bash
yarn type:generate
```

**What this does:**
- Uses Supabase CLI to read your local database structure
- Creates TypeScript type definitions in `src/shared/types/supabase.ts`
- Gives you autocomplete when working with database data

**⚠️ Important:** After running this command, you need to manually remove the last line in `src/shared/types/supabase.ts` (it's usually an extra export that causes issues).

## Seeding (Adding Test Data)

**What is seeding?** Seeding means adding sample/test data to your local database so you can develop and test features without real data.

### Generating Seeds

To create seed data from your current local database:

```bash
yarn generate:seed
```

**When to use this:**
- After adding new tables or columns
- When you need sample data to test new features
- To help other developers get started quickly with realistic data

**Note:** Seed files are located in `supabase/seeds/`
