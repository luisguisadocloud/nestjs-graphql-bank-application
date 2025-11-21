# GraphQL API Examples

This directory contains example queries and mutations for the Banking GraphQL API.

## Files

- **queries.graphql** - Example queries for fetching data
- **mutations.graphql** - Example mutations for creating and updating data

## How to Use

### Using Apollo Studio Sandbox

1. Start the application:
   ```bash
   yarn start:dev
   ```

2. Open your browser and navigate to `http://localhost:3000/graphql`

3. Copy any query or mutation from the `.graphql` files

4. Paste it into the query editor

5. If the query/mutation uses variables, add them in the "Variables" panel at the bottom

6. Click the "Run" button or press `Ctrl+Enter` (or `Cmd+Enter` on Mac)

### Using Variables

Many queries and mutations require variables. In Apollo Studio Sandbox:

1. Copy the query/mutation to the query editor
2. Copy the variables JSON example from the file
3. Paste it into the "Variables" panel (bottom left)
4. Replace placeholder values (like UUIDs) with actual IDs from your database

### Example Workflow

1. **Create a user:**
   - Copy the `createUser` mutation from `mutations.graphql`
   - Update the email and fullName in the variables
   - Execute the mutation
   - Save the returned `id` for next steps

2. **Open an account:**
   - Copy the `openAccount` mutation from `mutations.graphql`
   - Use the user ID from step 1
   - Choose account type (CHECKING or SAVINGS) and currency (USD or PEN)
   - Execute the mutation
   - Save the returned account `id`

3. **Deposit funds:**
   - Copy the `deposit` mutation from `mutations.graphql`
   - Use the account ID from step 2
   - Set the amount and description
   - Execute the mutation

4. **Query transactions:**
   - Copy the `GetTransactionsByAccount` query from `queries.graphql`
   - Use the account ID from step 2
   - Execute the query to see the deposit transaction

## Notes

- All IDs are UUIDs (Universally Unique Identifiers)
- Currency values must be: `USD` or `PEN`
- Account types must be: `CHECKING` or `SAVINGS`
- Transaction types are automatically set: `DEPOSIT`, `TRANSFER`, or `WITHDRAWAL`
- Transaction status can be: `PENDING`, `COMPLETED`, or `FAILED`

