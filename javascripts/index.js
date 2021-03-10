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
  Story.renderPartTwo("food")

}

function horse() {
  ride.chosen = true
  
 Story.renderPartTwo("horse")

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
        Story.renderPartOne()
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
    User.getUsers()
  }
  else {
    
  }
})