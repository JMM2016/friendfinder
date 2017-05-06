// Dependency
const path = require("path")

// -- Set up routes

module.exports = function(svr) {

  // Route that sends the user to home page
  svr.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"))
  })

  // Basic route that sends the user to home page
  svr.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"))
  })
}

