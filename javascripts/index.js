

let user = ""



function main() {
  return document.getElementById("main")
}

function resetMain() {
  main().innerHTML = ""
}

function nameInput() {
  return document.getElementById("name")
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
  <img src="avatars/finn.png" alt="">
  <input type="submit" value="Choose">
  <h3> Choose your Avatar </h3>
  <img src="avatars/jake.png" alt="">
  <input type="submit" value="Choose">
  <h3> Choose your Avatar </h3>
  <img src="avatars/princess.png" alt="">
  <input type="submit" value="Choose">
  `
}

function renderNameTemplate() {
  resetMain()
  main().innerHTML = nameTemplate()
  form().addEventListener("submit", submitForm)
  
}

function submitForm(e) {
  e.preventDefault()
  user = nameInput().value
  main().innerHTML = avatarTemplate()

}





document.addEventListener("DOMContentLoaded", function() {
  if(user == "") {
    renderNameTemplate()
  }
  else {
    main().innerHTML = avatarTemplate()
  }
})