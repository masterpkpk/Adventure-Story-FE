const user = ""

function main() {
  return document.getElementById("main")
}

function resetMain() {
  main().innerHTML = ""
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
    `
}

function renderNameTemplate() {
  resetMain()
  main().innerHTML = nameTemplate()
  
}





document.addEventListener("DOMContentLoaded", function() {
  getUserName()
})