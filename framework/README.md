# Framework Documentation
## Classes
### Class
`property` - **data type**, description.
### Player
`id` - **integer**, used to uniquely identify the player.

`username` - **string**, publicly displayed name as well as login input.

`password` - **string**, private sha256 hashed password.

`kingdom` - **Kingdom**, players kingdom class.
### Kingdom
`id` - **integer**, used to uniquely identify the kingdom.

`name` - **string**, publicly displayed name of kingdom.

`producers` - **array<Producer>**, array of producers owned by the kingdom.

`harbour` - **harbour**, the harbour that connects the kingdom to the market.
### Treasury
`id` - **integer**, used to uniquely identify the treasury.

`balance` - **integer**, the balance of the treasury.

`health` - **integer**, the health of the treasury (to be used for wars).

`effectBalance(amount)` - Parameter: **integer**, effects the balance of the treasury, input negative numbers to reduce it.

`damage(amount)` - Parameter: **integer**, reduces the health of the treasury by the specified amount.

`repair(amount)` - Parameter: **integer**, increases the health of the treasury by the specified amount.

### Harbour
`id` - **integer**, used to uniquely identify the harbour.

`health` - **integer**, the health of the harbour (to be used for wars).
### Market
`commodities` - **array<Commodity>**, array container commodities of market.
### Commodity
`id` - **integer**, used to uniquely identify the commodity.

`name` - **string**, name of commodity.

`type` - **string**, type of commodity (mainly going to be used for sorting and UI stuff).
### Producer
`id` - **integer**, used to uniquely identify the producer.

`type` - **string**, type of producer.

`level` - **integer**, the level of the producer determines effectiveness (e.g: farm yield).

`upgrade()` - increases the producer's level.
### Farm
`growth` - **array<array<Integer>>**, 2 dimensional array containing the growth stages of the crops.

`yield` - **integer**, a integer representing the yield of farm depending on the farm's level. Formula is as follows:
```javascript
Math.floor(Math.pow(this.level, 2) + (Math.pow(this.level, 2) / 3));
```
## Interface
