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
  static async getStories() {
 
    const data = await Api.get("/stories");
    Story.all = data
    
  }

  // static storyFetch() {

  //  let strongParams = {
  //     story: {
  //       check_points: 0
  //     }
  //   }
    
  //   fetch(baseUrl + `/stories/${current_story.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(strongParams)
  //   })
  //   .then(function(resp) {
  //     return resp.json()
  //   })
  //   .then(function(data){
  //     current_story = data
  //   })
  
  // }
  
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
    
    <h1> Welcome to the Adventure Story! </h1>
    <br>
    <p> Would you like to begin a new adventure? </p> 
    <p> <input type="submit" value="Yes!" onclick="return User.renderNameTemplate()"></p>
    
    <p> Or enter name to continue </p> 
    <form id="form">
      <div class="input-field">
        <p> <label for="name">Name</label> <br> </p>
        <p> <input type="text" name="name" id="name"> </p>
      </div>
      <p> <input type="submit" value="Continue"> </p>
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
  
    <h1> Adventure awaits ${current_user.name}! </h1>
    <p> ${current_user.avatar} <p>

    
    <p> Adventurer! The non-binary princess prince has been captured 
    by the evil Dragon who is also non-binary! We need 
    your help to rescue them! (pronouns are important!)
    What is your first course of action?!</p>
    
  
    ${Choice.choiceTemplate()}
    
    `
  }

  static renderPartTwo(choice) {

    resetMain()
    if(choice == "horse") {
    main().innerHTML = `
    <h1> You mount your trusty steed and make way 
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

  static updateCheckPoint(checkpoint) {

    let strongParams = {

      story: {
        check_points: checkpoint
      }
    }

    Api.patch(`/stories/${current_story.id}`, strongParams) 
    .then(function(data) {
      current_story.check_points = data.check_points
    })

    

  }
  

}

// checkpoint locations 
//  1. = partOne
//  2. = partTwo 
//  ect ect 