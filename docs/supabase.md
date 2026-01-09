# Supabase

Supabase is backend

## Migration

You can update de schema of the database inside `supabase/schemas`. After making some modification you need to generate a migration file to apply the modification to your local database.

```bash
yarn supabase db diff -f describe_your_migration
```

To apply the migration to your local supabase

```bash
yarn supabase migration up
```

To keep seeding sync you need to run after the migration
```bash
npx @snaplet/seed sync
```

When your pull-request will be merge onto main branches, the CI will automatically deploy the migration to the production production.

## Seeding

To generate seed you can run :
```bash
yarn generate:seed
```

Each time

## Types

You can generate the types from the database with the command :
```
yarn types:generate
```

This script use Supabase CLI to generate the types file from your local database. You just need to go remove the last line inside the file `src/shared/types/supabase.ts` after running the command.
