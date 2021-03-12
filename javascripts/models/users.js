class User {

  static baseUrl = "http://localhost:3000"

  constructor(attr) {
    this.name = attr.name
    this.story_id = attr.story_id
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
    
    
    let user = User.findsNameOne(e)
    

    if(nameInput().value == user.name) {
      
      User.renderNameErrorTemplate()
    }
    else {

    let strongParams = {
      user: {
        name: nameInput().value,
        story_id: current_story.id,
        avatar: ""
      }
    }
  
    Api.post('/users', strongParams)
    .then(function(data) {
      User.create(data)
      User.all.push(data)
      User.renderAvatarTemplate()
      current_user = data
     
    })
  }
    
  }

  static editFormTemplate(id) {

    return `
    <h1>Edit Hero</h1>
    <form id="form" data-id="${id}">
      <div class="input-field">
        <label for="name">Name</label> <br><br>
        <input type="text" name="name" id="name" value="${current_user.name}" />
      </div>
      <input type="submit" id="submit" value="Submit" >

    
    `;



  }

  static renderEditFormTemplate(user) {
    
    resetMain();
    main().innerHTML = User.editFormTemplate(user);
    form().addEventListener("submit", User.submitEditForm);
  }


  static submitEditForm(e) {

    e.preventDefault();
  
    let strongParams = {
      user: {
        name: nameInput().value,
        avatar: "",
        story_id: current_user.story_id
      }
    }
   

    const id = e.target.dataset.id;
    
    Api.patch("/users/" + id, strongParams)
      .then(function(data) {
        
        let u = User.all.find((u) => u.id == data.id);
        let idx = User.all.indexOf(u);
        User.all[idx] = new User(data);
        current_user.name = nameInput().value
        User.renderAvatarTemplate()
        
      })

  }

  static nameTemplate() {

    return `
    <div class="container">
      <h1>Enter your Hero's Name</h1>
      <form id="form">
      <div class="input-field">
        <h2> <label for="name">Name</label> </h2>
        <p> <input type="text" name="name" id="name"> </p>
      </div>
      <p> <input type="submit" value="Create Hero"> </p>
      </form>
      </div>
      `
    
  
  }

  static nameErrorTemplate() {

    return `
    <div class="container">
      <h1>Enter your Hero's Name</h1>
      <br>
      <h2> That name is already taken! Please choose another! </h2>
      <form id="form">
      <div class="input-field">
        
        <p> <input type="text" name="name" id="name"> </p>
      </div>
      <p> <input type="submit" value="Create Hero"> </p>
      </form>
      </div>
      `
    
  
  }

  static avatarTemplate() {

    return `
    <div class="container">
    <h1> Choose your Avatar </h1>
    <p>
      <div class="row">
        <div class="column">  
          <button onclick="return knight()" style="background-color: transparent" >
          ${knightPic}</button>
          <input type="hidden" id="avatar" value="<img src='avatars/knight.gif' style='background-color:transparent'>">
        </div>
        
        <div class="column"> 
          <button onclick="return wolf()" style="background-color: transparent" >
          ${wolfPic}</button>
          <input type="hidden" id="avatar" value="<img src='avatars/wolf.gif' style='background-color:transparent'>">
        </div>

        <div class="column"> 
          <button onclick="return onion()" style="background-color: transparent" >
          ${onionPic}</button>
          <input type="hidden" id="avatar" value="<img src='avatars/onion.gif' style='background-color:transparent'>">
        </div>
      </div>
    </p>  
    </div>
    
    `
  
  }

  static renderNameTemplate() {

    resetMain()
    Story.createStoryObj()
    main().innerHTML = User.nameTemplate()
    form().addEventListener("submit", User.submitName)
  
  }

  static renderNameErrorTemplate() {

    resetMain()
    main().innerHTML = User.nameErrorTemplate()
    form().addEventListener("submit", User.submitName)
  
  }

  static findName(e) {

    e.preventDefault()
    let name = nameInput().value
    User.all.forEach(function (user){
      if(name == user.name){
        current_user = user
        User.findStory()
      }
    })
    
  
  }

  static findStory() {
    
    Story.all.forEach(function (story){
      if(story.id == current_user.story_id) {
        current_story = story
        User.findPart()
      }
    })
  }

  static findPart() {
    const check = current_story.check_points
    switch(check) {
      case 2:
        Story.renderPartTwo("horse")
        break
      default:
        Story.renderPartOne()
    }

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


  static findsNameOne(e) {
    e.preventDefault()
    
    let name = nameInput().value
    
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
    <div class="container">
    <h1> Alright ${current_user.name}! Are you satisfied 
    with your hero?! </h1> <br>
   
  
    <p> <input type="submit" value="Yes i'm ready!" onclick="return Story.renderPartOne()"> </p>
    
    <p> OR click to edit </p>
    
    <p> <input type="submit" value="Take me back!" onclick="return User.renderEditFormTemplate(${current_user.id})"> </p>
    
    <form id="delete">
      <div class="input-field">
       <p> <label for="delete">Type name to Delete</label> </p>
       <p> <input type="text" name="deletename" id="deletename"> </p>
      </div>
      <p> <input type="submit" value="Are you sure?"> </p>
    </form>
    </div>
    `
  }
  
  static renderConfirmUserForm() {
    resetMain()
    main().innerHTML = User.confirmUserForm()
    deletes().addEventListener("submit", User.deleteUser)
  }

  static avatarFetch(pic) {

    let strongParams = {
      user: {
        name: current_user.name,
        story_id: current_story.id,
        avatar: pic
      }
    }
    
    Api.patch(`/users/${current_user.id}`, strongParams)
    .then(function(data){
        User.all.forEach(function(user){
          if(current_user.name == user.name){
            current_user.avatar = pic
            User.renderConfirmUserForm()
          }
        })
      })
  }

  static async deleteUser(e) {

    e.preventDefault()
   
    // let user = User.findsName()
    
    
    const data = await Api.delete(baseUrl + "/users/" + `${current_user.id}`)
   
    User.all = User.all.filter(function(user) {
  
      return user.id !== data.id
    })
    

    Story.renderStoryTemplate()
  }
  
  
  
}