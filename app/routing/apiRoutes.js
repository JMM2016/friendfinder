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

    // I guess body will have the name,photo ,scores[]
    // ready to go into friendsData ???
    console.log("r.body= " + JSON.stringify(req.body))

    let bestMatch

    console.log("fData: " + friendsData.length )

    if (friendsData.length === 0) {
      bestMatch = {
        "name": "Sorry, there are no other users right now.",
        "photo":"http://findicons.com/files/icons/350/aqua_smiles/128/sad.png"
      }
    } else {

      let highScore = -1

      // compare the new friend to all the other friends
      for (let i = 0; i < friendsData.length; i++) {

        // grab first friend
        let tempMatch = friendsData[i]
        bestMatch = tempMatch
        let sum = 0

        for (let j = 0; j < tempMatch.scores.length; j++) {
          console.log (req.body.scores[j] - tempMatch.scores[j])
          console.log(Math.abs(req.body.scores[j] - tempMatch.scores[j]))
          sum +=  Math.abs(req.body.scores[j] - tempMatch.scores[j])
          console.log("inner sum: " + sum)
        }

        if(sum > highScore){
          highScore = sum
          bestMatch = tempMatch
        }
        console.log("outer sum: " + sum)
      }
    }

    friendsData.push(req.body)
    console.log("bM: " + bestMatch)
    res.send(bestMatch)
  })
}