# Supabase

Supabase is the backend of this project. Supabase generate a rest API which is consumed by Refine inside the React app.

## Migration

You can update the schema of the database  `supabase/schemas`. After making some modification you need to generate a migration file to apply the modification to your local database.

```bash
yarn supabase db diff -f describe_your_migration
```

To apply the migration to your local supabase

```bash
yarn supabase migration up
```

To keep seeding sync you need to run after the migration
```bash
yarn seed:sync
```

Also need to update type for TypeScript auto completion.
```bash
yarn type:generate
```

When your pull-request will be merge onto main branches, the CI will automatically deploy the migration to the production production.

## Types

You can generate the types from the database with the command :
```bash
yarn type:generate
```

This script use Supabase CLI to generate the types file from your local database. You just need to go remove the last line inside the file `src/shared/types/supabase.ts` after running the command.

## Seeding

To generate seed you can run :
```bash
yarn generate:seed
```

Each time
