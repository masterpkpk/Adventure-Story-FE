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

  static create(attr) {
    
    let choice = new Choice(attr)
    choice.save()
    return choice
    
  }

  save() {
    Choice.all.push(this)
  }

  static choiceTemplate(choice1, choice2){

    return `
    <br> <br>
    <h1> Make a choice Hero! </h1>
    <div class="row">
      <div class="column">
        <p> Search Room </p>
        <button onclick="return search()" style="background-color: transparent" id="Ok" >
        ${choice1}</button> 
      </div>

      <div class="column">
        <p> Open Door </p>
        <button onclick="return door()" style="background-color: transparent" id="Ok" >
        ${choice2}</button> 
      </div>
    </div
  
    
  
    `
  
  }

  static createChoiceObj(decision, id) {

    
    let strongParams = {
      choice: {
        user_id: current_user.id,
        story_id: current_user.id,
        name: decision,
        chosen: true,
        checkpoint_id: id
      }
    }
    
    Api.post('/choices', strongParams)
      .then(function(data) {
        Choice.create(data)
        
        
      })
    }

  

}



