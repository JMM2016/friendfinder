// Dependencies
const express = require("express")
const bodyParser = require("body-parser")


// Sets up the Express server
const svr = express()
const PORT =  process.env.PORT || 3005


// Sets up the Express server to handle data parsing
svr.use(bodyParser.json())
svr.use(bodyParser.urlencoded({ extended: true }))
svr.use(bodyParser.text())
svr.use(bodyParser.json({ type: "application/vnd.api+json" }))


// Set up router
require("./app/routing/apiRoutes")(svr)
require("./app/routing/htmlRoutes")(svr)


// Starts the server to begin listening
svr.listen (PORT, () => {
  console.log("Server listening on PORT " + PORT)
})