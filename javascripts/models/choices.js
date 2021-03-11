class Choice {
  
  static all = []

  constructor(attr) {
  this.name = attr.name
  this.chosen = attr.chosen
  this.user_id = attr.user_id
  this.story_id = attr.story_id
  Choice.all.push(this)
  }

  

  static choiceTemplate(){

    return `
    <h3> Make a choice Hero! </h3>
    ${eat.name} <input type="hidden" id="food" >
    <input type="submit" value="Choose" onclick="return food()"> &nbsp;
  
    ${ride.name} <input type="hidden" id="ride" >
    <input type="submit" value="Choose" onclick="return horse()">
  
    `
  
  }

  

}

let eat = new Choice({name: "Food", chosen: false})
let ride = new Choice({name: "Ride", chosen: false})

