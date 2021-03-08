let user = ""

let avatar = ""





function main() {
  return document.getElementById("main")
}

function resetMain() {
  main().innerHTML = ""
}

function nameInput() {
  return document.getElementById("name")
}


function finn() {
  avatar = "<img src='avatars/finn.png'>"
  renderPartOne()
}

function jake() {
  avatar = "<img src='avatars/jake.png'>"
  renderPartOne()
}

function princess() {
  avatar = "<img src='avatars/princess.png'>"
  renderPartOne()
}

function food() {
  eat.chosen = true
  renderPartTwo()
}

function horse() {
  ride.chosen = true
  renderPartTwo()
}


function form() {
  return document.getElementById("form")
}

function getUserName(input) {
  user = input
}

function unfade(element) {
  var op = 0.1;  // initial opacity
  element.style.display = 'block';
  var timer = setInterval(function () {
      if (op >= 1){
          clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 0.1;
  }, 10);
}

function nameTemplate() {
  return `
    <h2> Welcome to the Adventure Story! </h2>
    <br>
    <h3>Enter your Hero's Name</h3>
    <form id="form">
    <div class="input-field">
      <label for="name">Name</label>
      <input type="text" name="name" id="name">
    </div>
    <input type="submit" value="Create Hero">
    </form>
    `
}

function avatarTemplate() {
  return `
  <h3> Choose your Avatar </h3>
  
    <img src="avatars/finn.png">
    <input type="hidden" id="avatar" value="<img src='avatars/finn.png'>">
    <input type="submit" value="Choose" onclick="return finn()">
    
    <img src="avatars/jake.png" >
    <input type="hidden" id="avatar" value="<img src='avatars/jake.png'>">
    <input type="submit" value="Choose" onclick="return jake()">
    
    <img src="avatars/princess.png" >
    <input type="hidden" id="avatar" value="<img src='avatars/princess.png'>">
    <input type="submit" value="Choose" onclick="return princess()">
  
  `
}

function optionTemplate(){
  return `
  <h3> Make a choice Hero! </h3>
  ${eat.name} <input type="hidden" id="food" >
  <input type="submit" value="Choose" onclick="return food()"> &nbsp;

  ${ride.name} <input type="hidden" id="ride" >
  <input type="submit" value="Choose" onclick="return horse()">

  `
}


function renderNameTemplate() {
  resetMain()
  main().innerHTML = nameTemplate()
  form().addEventListener("submit", submitName)
  
  
}

function renderAvatarTemplate() {
  resetMain()
  main().innerHTML = avatarTemplate()
 
  
}

function submitName(e) {
  e.preventDefault()
  user = nameInput().value

  renderAvatarTemplate()
}



function renderPartOne() {
 
  resetMain() 
  main().innerHTML = `

  <h3> Adventure awaits ${user}! </h3> <br>
  ${avatar}
  <img src="images/pixelbkg.jpg" width="400" height="200"> 
  
  Adventurer! The non-binary princess prince has been captured 
  by the evil Dragon who is also non-binary! We need 
  your help to rescue them! (pronouns are important!)
  What is your first course of action?!

  ${optionTemplate()}
  
  `
}

function renderPartTwo() {
  resetMain()
  main().innerHTML = "HI"
}



document.addEventListener("DOMContentLoaded", function() {
  if(user == "") {
    renderNameTemplate()
  }
  else {
    
  }
})