const baseUrl = "http://localhost:3000"
let stories = []
let current_user = ""
let current_story = ""
let current_checkpoint = ""
let avatar = ""
const knightPic = "<img class='knight' src='avatars/knight.gif'  height='188' width='188' ></img>"
const wolfPic = "<img src='avatars/wolf.gif'  height='188' width='188' style='transform: scaleX(-1);'</img>"
const onionPic = "<img src='avatars/onion.gif'  height='188' width='188' style='transform: scaleX(-1);'</img>"
const diePic = "<img class='shake' src='images/die.png' width='50' height='50'></img>"
const searchPic = "<img class='shake' src='images/eyeball.png' width='100' height='100'></img>"
const doorPic = "<img class='shake' src='images/door.png' width='100' height='100'></img>"
const main = () => document.getElementById("main")
const form = () => document.getElementById("form")
const check = () => document.getElementById("check")
const nameInput = () => document.getElementById("name")
const avatarInput = () => document.getElementById("avatar")
const deletes = () => document.getElementById("delete")
const deleteName = () => document.getElementById("deletename")





  