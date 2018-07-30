# Framework Documentation
## Classes
### Class
`property` - **data type**, description.
### Player
`id` - **integer**, used to uniquely identify the player.

`username` - **string**, publicly displayed name as well as login input.

`password` - **string**, private sha256 hashed password.

`islands` - **array<Island>**, array of islands belonging to player.
### Island
`id` - **integer**, used to uniquely identify the island.

`owner` - **player**, used to identify the owner of the island.

`kingdom` - **kingdom**, used to identify the kingdom which exists on the island.
### Kingdom
`id` - **integer**, used to uniquely identify the kingdom.

`name` - **string**, publicly displayed name of kingdom.

`treasury` - **treasury**, the private treasury owned by the kingdom.
## Interface
