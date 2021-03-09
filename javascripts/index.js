let stories = []
let users = []
let current_user = ""
let current_story = ""
let avatar = ""
const finnPic = "<img src='avatars/finn.png'></img>"
const jakePic = "<img src='avatars/jake.png'>"
const princessPic = "<img src='avatars/princess.png'>"
const baseUrl = "http://localhost:3000"

function rollDie() {

  min = Math.ceil(1);
  max = Math.floor(7);
  return Math.floor(Math.random() * (7 - 1) + 1);

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
  
  avatarFetch(finnPic)
  
}

function jake() {
  
  avatarFetch(jakePic)

}

function princess() {
 
 avatarFetch(princessPic)

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

function createStoryObj() {
  
  let strongParams = {
    story: {
      user_id: "",
      check_points: 0
    }
  }
  
  fetch(baseUrl + "/stories", {
    body: JSON.stringify(strongParams),
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(function (resp){
    return resp.json()
  })
  .then(function (data){
    stories.push(data)
    current_story = data
  })
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
  <button onclick="return rollDisplay()" id="Ok"><img src="images/die.jpg" width="50" height="50"></button> 
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
  createStoryObj()
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
      current_user = user
      renderPartOne()
    }
  })

}



function submitName(e) {

  e.preventDefault()
  
  let strongParams = {
    user: {
      name: nameInput().value,
      avatar: ""
    }
  }

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
    current_user = data
    storiesFetch()
  })

}



function renderPartOne() {
 
  resetMain() 
  main().innerHTML = `

  <h3> Adventure awaits ${current_user.name}! </h3> <br>
  ${current_user.avatar}
  <img src="images/pixelbkg.jpg" width="400" height="200"> <br><br>
  
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

function avatarFetch(pic) {

  strongParams = {
    user: {
      name: current_user.name,
      avatar: pic
    }
  }
  
  fetch(baseUrl + `/users/${current_user.id}`, {
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
    users.forEach(function(user){
      if(current_user.name == user.name){
        current_user.avatar = pic
        renderPartOne()
      }
    })
  })

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
  if(users.length == 0) {
    renderStoryTemplate()
    // renderNameTemplate()
    getUsers()
  }
  else {
    
  }
})