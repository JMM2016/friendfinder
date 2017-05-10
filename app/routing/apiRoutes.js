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
      let lowScore = 41

      for (let friend in friendsData) {
        friend = friendsData[friend]
        let sum = 0

        sum = friend.scores.reduce((acc, currVal, currIdx) => {
            return acc + Math.abs(currVal - req.body.scores[currIdx])
          }, 0
        )

        if (sum < lowScore) {
          lowScore = sum
          bestMatch = friend
        }
      }
    }

    friendsData.push(req.body)
    res.send(bestMatch)
  })
}