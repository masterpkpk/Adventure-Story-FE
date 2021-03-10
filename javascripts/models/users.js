class User {

  static baseUrl = "http://localhost:3000"

  constructor(name) {
    this.name = name
  }

  static all = []

  save() {
    User.all.push(this)
  }

  static create(attr) {

    let user = new User(attr)
    user.save()
    return user
  }

  static async getUsers() {
 
    const data = await Api.get("/users");
    User.all = data
    
  }

  static submitName(e) {

    e.preventDefault()
    
    let strongParams = {
      user: {
        name: nameInput().value,
        avatar: ""
      }
    }
  
    Api.post('/users', strongParams)
    .then(function(data) {
      User.create(data)
      User.all.push(data)
      User.renderAvatarTemplate()
      current_user = data
      storiesFetch()
    })
    
  }

  static nameTemplate() {

    return `
      <h2> Welcome to the Adventure Story! </h2>
      <br>
      <h3>Enter your Hero's Name</h3>
      <form id="form">
      <div class="input-field">
        <label for="name">Name</label>
        <input type="text" name="name" id="name">
      </div>
      <input type="submit" value="Create Hero">
      </form>
      `
  
  }

  static renderNameTemplate() {

    resetMain()
    Story.createStoryObj()
    main().innerHTML = User.nameTemplate()
    form().addEventListener("submit", User.submitName)
  
  }

  static findName(e) {

    e.preventDefault()
    let name = nameInput().value
    User.all.forEach(function (user){
      if(name == user.name){
        current_user = user
        Story.renderPartOne()
      }
    })
  
  }

  static renderAvatarTemplate() {

    resetMain()
    main().innerHTML = avatarTemplate()
   
  }
  
  
}