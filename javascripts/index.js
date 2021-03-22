const resetMain = () => main().innerHTML = ""
const knight = () => User.avatarFetch(knightPic)
const wolf = () => User.avatarFetch(wolfPic)
const onion = () => User.avatarFetch(onionPic)
const rollDisplay = () => (resetMain(), main().innerHTML = `${rollDie()}`)
const search = () => (Choice.createChoiceObj("search", 1), Story.updateCheckPoint(1), rollTemplate())
const  door = () =>(Choice.createChoiceObj("door", 2), Story.updateCheckPoint(2), rollTemplate())


function rollDie() {

  min = Math.ceil(1);
  max = Math.floor(7);
  return Math.floor(Math.random() * (7 - 1) + 1);

}


function rollTemplate() {

  resetMain() 
  main().innerHTML = `
  
  <div class="container">
    <h1> Roll to decide your fate </h1>
    <input type="hidden" id="roll" >
    <p> <button onclick="return rollDisplay() " style="background-color: transparent" id="Ok">${diePic}</button> </p>
  </div>
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