# Knex Project Scripts

1. setup dbs - CAN USE JUST ONCE PER MACHINE!
2. make migration - creates a file.
3. migrate latest - runs all `up` fns, in the migration files in the correct order
4. migrate rollback - runs all `down` fns in the migration files - thereby dropping all data
5. seed - (rollback -> latest) inserts data
