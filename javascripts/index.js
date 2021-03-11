const  resetMain = () => main().innerHTML = ""
const finn = () => User.avatarFetch(finnPic)
const jake = () => User.avatarFetch(jakePic)
const princess = () => User.avatarFetch(princessPic)
const rollDisplay = () => (resetMain(), main().innerHTML = `${rollDie()}`)
const food = () => (eat.chosen = true, Story.renderPartTwo("food"))
const  horse = () =>(ride.chosen = true, current_story.check_points = ride.checkpoint_id, Story.updateCheckPoint(ride.checkpoint_id), Story.renderPartTwo("horse"))
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





document.addEventListener("DOMContentLoaded", function() {
  if(User.all.length == 0) {
    Story.renderStoryTemplate()
    User.getUsers()
    Story.getStories()
  }
  else {
    
  }
})