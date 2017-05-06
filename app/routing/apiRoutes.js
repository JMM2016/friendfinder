// Dependency
const path = require("path")
const friendsData = require("../data/friends")


// -- Set up routes

module.exports = function(svr) {

  // Route that sends the user all the friends
  svr.get("/api/friends", (req, res) => {
    res.json(friendsData)
  })

  // Route that gets friend data from page
  svr.post("/api/friends", (req, res) => {

    let bestMatch

    if (friendsData.length === 0) {
      bestMatch = {
        "name": "Sorry, there are no other users right now.",
        "photo":"http://findicons.com/files/icons/350/aqua_smiles/128/sad.png"
      }
    } else {
      bestMatch = friendsData[0]
      let highScore = -1

      // compare the new friend to all the other friends
      for (let i = 0; i < friendsData.length; i++) {

        // grab first friend
        let tempMatch = friendsData[i]
        let sum = 0

        for (let j = 0; j < tempMatch.scores.length; j++) {
          sum +=  Math.abs(req.body.scores[j] - tempMatch.scores[j])
        }

        if (sum > highScore) {
          highScore = sum
          bestMatch = tempMatch
        }
      }
    }

    friendsData.push(req.body)
    res.send(bestMatch)
  })
}