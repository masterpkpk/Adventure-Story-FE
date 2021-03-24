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

  
  static createStoryObj() {
  
    let strongParams = {
      story: {
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
    <div class="container">
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
    </div>
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
    <div class="container">

      <p> You awaken to the sound of dripping water. Laying in a pile of rubble
      you take a moment to asses the situation to find that you are trapped in a dungeon 
      cell. You know this cell all too well. At the far end of the room there is a door. What will you do? </p>
      
      ${Choice.choiceTemplate(searchPic, doorPic)}

    </div>
    
    `
  }

  static renderPartTwo(choice) {

    resetMain()
    if(choice == "door") {
      main().innerHTML = rollTemplate()
    }
    else if (choice == "search") {
      rollTemplate()
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
      
    })

    

  }
  

}

// checkpoint locations 
//  1. = partOne
//  2. = partTwo 
//  ect ect 