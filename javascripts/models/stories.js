class Story {
  
  static all = []

  constructor(attr){
    this.user_id = attr.user_id
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
    <input type="submit" value="Yes!" onclick="return renderNameTemplate()">
    <br><br>
    Or enter name to continue? <br> <br>
    <form id="form">
      <div class="input-field">
        <label for="name">Name</label> <br>
        <input type="text" name="name" id="name">
      </div>
      <input type="submit" value="Continue"> <br> <br>
      <div class="input-field">
        <label for="delete">Type name to Delete</label> <br>
        <input type="text" name="delete" id="delete">
      </div>
      <input type="submit" value="Are you sure?">
  
    </form>
    `
  
  }

  static renderStoryTemplate() {

    resetMain()
    main().innerHTML = Story.storyTemplate()
    form().addEventListener("submit", findName)
    
  }
  

}