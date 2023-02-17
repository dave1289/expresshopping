const express = require('express')
const expressError = require('./expressError')
const itemRoutes = require('./routes/shoppingRoutes')
const middleware = require('./middleware')

function add(x, y) {
   return x + y
}

const app = express();
app.use(express.json());
app.use('/item', itemRoutes)

app.use(()=>{
   middleware.errorHandler
})

module.exports = app
