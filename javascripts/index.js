

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

function resetMain() {

  main().innerHTML = ""

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
  Choice.renderPartTwo("food")

}

function horse() {
  ride.chosen = true
  
  Choice.renderPartTwo("horse")

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




function choiceTwoTemplate() {

}


function renderNameTemplate() {

  resetMain()
  Story.createStoryObj()
  main().innerHTML = nameTemplate()
  form().addEventListener("submit", User.submitName)

}

function renderAvatarTemplate() {

  resetMain()
  main().innerHTML = avatarTemplate()
 
}

function findName(e) {

  e.preventDefault()
  let name = nameInput().value
  User.all.forEach(function (user){
    if(name == user.name){
      current_user = user
      renderPartOne()
    }
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

  ${Choice.choiceTemplate()}
  
  `
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
    User.all.forEach(function(user){
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
  if(User.all.length == 0) {
    Story.renderStoryTemplate()
    // renderNameTemplate()
    User.getUsers()
  }
  else {
    
  }
})