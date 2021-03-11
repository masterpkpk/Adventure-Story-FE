class Story {
  
  static all = []

  constructor(attr){
    this.check_points = attr.check_points
  }

  save() {
    Story.all.push(this)
  }
  
  static create(attr) {

    let story = new Story(attr)
    story.save()
    return story

  }
  
  static createStoryObj() {
  
    let strongParams = {
      story: {
        user_id: "",
        check_points: 0
      }
    }
    
    Api.post('/stories', strongParams)
      .then(function(data) {
        Story.create(data)
        current_story = data
      })

  }

  static storyTemplate() {

    return `
    <h2> Welcome to the Adventure Story! </h2>
    <br>
    Would you like to begin a new adventure? <br>
    <input type="submit" value="Yes!" onclick="return User.renderNameTemplate()">
    <br><br>
    Or enter name to continue? <br> <br>
    <form id="form">
      <div class="input-field">
        <label for="name">Name</label> <br>
        <input type="text" name="name" id="name">
      </div>
      <input type="submit" value="Continue"> <br> <br>
    </form>
  
    `
  
  }

  static renderStoryTemplate() {

    resetMain()
    main().innerHTML = Story.storyTemplate()
    form().addEventListener("submit", User.findName)
    
    
  }

  static renderPartOne() {
 
    resetMain() 
    main().innerHTML = `
  
    <h3> Adventure awaits ${current_user.name}! </h3> <br>
    ${current_user.avatar}
    <img src="images/pixelbkg.jpg" width="400" height="200"> <br><br>
    
    Adventurer! The non-binary princess prince has been captured 
    by the evil Dragon who is also non-binary! We need 
    your help to rescue them! (pronouns are important!)
    What is your first course of action?!
  
    ${Choice.choiceTemplate()}
    
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