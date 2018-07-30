# Framework Documentation
## Classes
### Class
`property` - **data type**, description.
### Player
`id` - **integer**, used to uniquely identify the player.

`username` - **string**, publicly displayed name as well as login input.

`password` - **string**, private sha256 hashed password.
### Kingdom
`id` - **integer**, used to uniquely identify the kingdom.

`name` - **string**, publicly displayed name of kingdom.

`producers` - **array<Producer>**, array of producers owned by the kingdom.

`harbour` - **harbour**, the harbour that connects the kingdom to the market.
### Treasury
`id` - **integer**, used to uniquely identify the kingdom.

`balance` - **integer**, the balance of the treasury.

`health` - **integer**, the health of the treasury (to be used for wars).
## Interface
