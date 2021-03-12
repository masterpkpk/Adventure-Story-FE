const baseUrl = "http://localhost:3000"
let stories = []
let current_user = ""
let current_story = ""
let avatar = ""
const knightPic = "<img class='knight' src='avatars/knight.gif'  height='188' width='188' ></img>"
const wolfPic = "<img src='avatars/wolf.gif'  height='188' width='188' style='transform: scaleX(-1);'</img>"
const onionPic = "<img src='avatars/onion.gif'  height='188' width='188' style='transform: scaleX(-1);'</img>"
const diePic = "<img class='die' src='images/die.png' width='50' height='50'></img>"
const main = () => document.getElementById("main")
const form = () => document.getElementById("form")
const check = () => document.getElementById("check")
const nameInput = () => document.getElementById("name")
const avatarInput = () => document.getElementById("avatar")
const deletes = () => document.getElementById("delete")
const deleteName = () => document.getElementById("deletename")





  