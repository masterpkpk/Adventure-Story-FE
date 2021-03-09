class Choice {
  
  static all = []

  constructor(name, chosen) {
  this.name = name
  this.chosen = chosen
  Choice.all.push(this)
  }

}

let eat = new Choice("Food", false)
let ride = new Choice("Ride", false)

