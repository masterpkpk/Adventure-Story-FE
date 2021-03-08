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
  return false
}

function jake() {
  avatar = "<img src='avatars/jake.png'>"
  return false
}

function princess() {
  avatar = "<img src='avatars/princess.png'>"
  return false
}


function form() {
  return document.getElementById("form")
}

function getUserName(input) {
  user = input
}

function nameTemplate() {
  return `
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
  <form id="form">
    <img src="avatars/finn.png">
    <input type="hidden" id="avatar" value="<img src='avatars/finn.png'>">
    <input type="submit" value="Choose" onclick="return finn()">
    
    <img src="avatars/jake.png" >
    <input type="hidden" id="avatar" value="<img src='avatars/jake.png'>">
    <input type="submit" value="Choose" onclick="return jake()">
    
    <img src="avatars/princess.png" >
    <input type="hidden" id="avatar" value="<img src='avatars/princess.png'>">
    <input type="submit" value="Choose" onclick="return princess()">
  </form>
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



function renderStory() {
  resetMain()
  return `
    ${avatar}
  `
}



document.addEventListener("DOMContentLoaded", function() {
  if(user == "") {
    renderNameTemplate()
  }
  else {
    renderStory
  }
})