class Choice {
  
  static all = []

  constructor(attr) {
  this.name = attr.name
  this.chosen = attr.chosen
  this.user_id = attr.user_id
  this.story_id = attr.story_id
  this.checkpoint_id = attr.checkpoint_id
  Choice.all.push(this)
  }

  

  static choiceTemplate(){

    return `
    <br> <br>
    <h1> Make a choice Hero! </h1>
    <p> ${eat.name} <input type="hidden" id="food" > </p>
    <p> <input type="submit" value="Choose" onclick="return food()"> </p>
  
    <p> ${ride.name} <input type="hidden" id="ride" > </p>
    <p> <input type="submit" value="Choose" onclick="return horse()"> </p>
  
    `
  
  }

  

}

let eat = new Choice({name: "Food", chosen: false, checkpoint_id: 1 })
let ride = new Choice({name: "Ride", chosen: false, checkpoint_id: 2})

