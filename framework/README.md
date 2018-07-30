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
`id` - **integer**, used to uniquely identify the treasury.

`balance` - **integer**, the balance of the treasury.

`health` - **integer**, the health of the treasury (to be used for wars).
### Market
`commodities` - **array<Commodity>**, array container commodities of market.
### Commodity
`id` - **integer**, used to uniquely identify the commodity.

`value` - **integer**, used to represent the economical value determined by supply and demand.

`name` - **string**, name of commodity.

`type` - **string**, type of commodity (mainly going to be used for sorting and UI stuff).
## Interface
