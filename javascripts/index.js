let story = []
let users = []
let current_user = ""
const baseUrl = "http://localhost:3000"
let avatar = ""

function rollDie() {
  min = Math.ceil(1);
  max = Math.floor(7);
  return Math.floor(Math.random() * (7 - 1) + 1); //The maximum is exclusive and the minimum is inclusive
}

function rollDisplay() {
  resetMain()
  main().innerHTML = `
  ${rollDie()}
  `
}


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
  renderPartTwo("food")
}

function horse() {
  ride.chosen = true
  renderPartTwo("horse")
}


function form() {
  return document.getElementById("form")
}

async function getUsers() {
 
  const resp = await fetch(baseUrl + '/users')
  const data = await resp.json()
  
  users = data
  
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

function storyTemplate() {
  return `
  <h2> Welcome to the Adventure Story! </h2>
  <br>
  Would you like to begin a new adventure?
  <input type="submit" value="Yes!" onclick="return renderNameTemplate()">
  <br>
  Or enter name to continue?
  <form id="form">
    <div class="input-field">
      <label for="name">Name</label>
      <input type="text" name="name" id="name">
    </div>
    <input type="submit" value="Continue">
  </form>

  `
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

function rollTemplate() {
  return `
  <h3> ROLL! </h3>
  <input type="hidden" id="roll" >
  <input type="submit" value="Roll" onclick="return rollDisplay()">
  `
}


function choiceTemplate(){
  return `
  <h3> Make a choice Hero! </h3>
  ${eat.name} <input type="hidden" id="food" >
  <input type="submit" value="Choose" onclick="return food()"> &nbsp;

  ${ride.name} <input type="hidden" id="ride" >
  <input type="submit" value="Choose" onclick="return horse()">

  `
}

function choiceTwoTemplate() {

}

function renderStoryTemplate() {
  resetMain()
  main().innerHTML = storyTemplate()
  form().addEventListener("submit", findName)
  

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

function findName(e) {
  e.preventDefault()
  let name = nameInput().value
  users.forEach(function (user){
    if(name == user.name){
      current_user = user.name
      renderAvatarTemplate()
    }
  })

  }



function submitName(e) {
  e.preventDefault()

  let strongParams = {
    user: {
      name: nameInput().value
    }
  }

  current_user = nameInput().value
  
  
 

  fetch(baseUrl + '/users', {
    body: JSON.stringify(strongParams),
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(function(resp){
    return resp.json()
  })
  .then(function(data){
    users.push(data)
    renderAvatarTemplate()
    
  })

}



function renderPartOne() {
 
  resetMain() 
  main().innerHTML = `

  <h3> Adventure awaits ${current_user}! </h3> <br>
  ${avatar}
  <img src="images/pixelbkg.jpg" width="400" height="200"> 
  
  Adventurer! The non-binary princess prince has been captured 
  by the evil Dragon who is also non-binary! We need 
  your help to rescue them! (pronouns are important!)
  What is your first course of action?!

  ${choiceTemplate()}
  
  `
}

function renderPartTwo(choice) {
  resetMain()
  if(choice == "horse") {
  main().innerHTML = `
  <h3> You mount your trusty steed and make way 
  for the mountains! as you gallop at maximum speed, 
  a tricky rogue jumps at you from the bushes!
  Roll quickly! 
  ${rollTemplate()}
  
  `
  }
  else {
    main().innerHTML
  }
}



document.addEventListener("DOMContentLoaded", function() {
  if(users.length == 0) {
    renderStoryTemplate()
    // renderNameTemplate()
    getUsers()
  }
  else {
    
  }
})