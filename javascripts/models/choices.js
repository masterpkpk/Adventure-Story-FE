class Choice {
  
  static all = []

  constructor(attr) {
  this.name = attr.name
  this.chosen = attr.chosen
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

  static renderPartTwo(choice) {

    resetMain()
    if(choice == "horse") {
    main().innerHTML = `
    <h3> You mount your trusty steed and make way 
    for the mountains! as you gallop at maximum speed, 
    a tricky rogue jumps at you from the bushes!
    Roll quickly! 
    ${rollTemplate()}
    
    `
    }
    else {
      main().innerHTML
    }
  
  }

}

let eat = new Choice({name: "Food", chosen: false})
let ride = new Choice({name: "Ride", chosen: false})

