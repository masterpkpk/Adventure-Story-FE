class Option {
  
  static all = []

  constructor(name, chosen) {
  this.name = name
  this.chosen = chosen
  Option.all.push(this)
  }

}

let eat = new Option("Food", false)
let ride = new Option("Ride", false)

