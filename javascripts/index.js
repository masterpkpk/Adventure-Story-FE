const  resetMain = () => main().innerHTML = ""
const finn = () => User.avatarFetch(finnPic)
const jake = () => User.avatarFetch(jakePic)
const princess = () => User.avatarFetch(princessPic)

const rollDisplay = () => (resetMain(), main().innerHTML = `${rollDie()}`)
const food = () => (eat.chosen = true, Story.renderPartTwo("food"))
const  horse = () =>(ride.chosen = true, Story.renderPartTwo("horse"))
function rollDie() {

  min = Math.ceil(1);
  max = Math.floor(7);
  return Math.floor(Math.random() * (7 - 1) + 1);

}


function rollTemplate() {

  return `
  <h3> ROLL! </h3>
  <input type="hidden" id="roll" >
  <button onclick="return rollDisplay()" id="Ok"><img src="images/die.jpg" width="50" height="50"></button> 
  `
}

function choiceTwoTemplate() {

}

function storiesFetch(user_id) {

  strongParams = {
    story: {
      user_id: current_user.id,
      check_points: 0
    }
  }
  
  fetch(baseUrl + `/stories/${current_story.id}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(strongParams)
  })
  .then(function(resp) {
    return resp.json()
  })
  .then(function(data){
    current_story = data
  })

}

document.addEventListener("DOMContentLoaded", function() {
  if(User.all.length == 0) {
    Story.renderStoryTemplate()
    User.getUsers()
  }
  else {
    
  }
})