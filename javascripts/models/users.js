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

  static avatarTemplate() {

    return `
    <h3> Choose your Avatar </h3>
    
      <img src="avatars/finn.png">
      <input type="hidden" id="avatar" value="<img src='avatars/finn.png'>">
      <input type="submit" value="Choose" onclick="return finn()">
      
      <img src="avatars/jake.png" >
      <input type="hidden" id="avatar" value="<img src='avatars/jake.png'>">
      <input type="submit" value="Choose" onclick="return jake()">
      
      <img src="avatars/princess.png" >
      <input type="hidden" id="avatar" value="<img src='avatars/princess.png'>">
      <input type="submit" value="Choose" onclick="return princess()">
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

  static findsName() {

    
    let name = deleteName().value
    
    User.all.forEach(function (user){
      if(name == user.name){
        name = user
      }
    })
    return name
  }

  static renderAvatarTemplate() {

    resetMain()
    main().innerHTML = User.avatarTemplate()
   
  }

  static confirmUserForm() {

    return `
      Alright ${current_user.name}! Are you satisfied 
      with your hero?!
    `
  }

  static avatarFetch(pic) {

    strongParams = {
      user: {
        name: current_user.name,
        avatar: pic
      }
    }
    
    Api.patch(`/users/${current_user.id}`, strongParams)
    .then(function(data){
        User.all.forEach(function(user){
          if(current_user.name == user.name){
            current_user.avatar = pic
            Story.renderStoryTemplate()
          }
        })
      })
  }

  static async deleteUser(e) {

    e.preventDefault()
   
    let user = User.findsName()
    
    
    const data = await Api.delete(baseUrl + "/users/" + `${user.id}`)
   
    User.all = User.all.filter(function(user) {
  
      return user.id !== data.id
    })
    

    Story.renderStoryTemplate()
  }
  
  
  
}