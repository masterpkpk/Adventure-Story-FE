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

  static editFormTemplate(id) {

    return `
    <h3>Edit Hero</h3>
    <form id="form" data-id="${id}">
      <div class="input-field">
        <label for="name">Name</label> <br><br>
        <input type="text" name="name" id="name" value="${current_user.name}" />
      </div>
    
    
      <img src="avatars/finn.png">
      <input type="hidden" id="avatar" value="<img src='avatars/finn.png'>">
      <input type="checkbox" id="accept" checked> Accept
      <input type="button" id="btn" value="Submit" >
    </form>
    <script>
        const cb = document.querySelector('#accept');
        const btn = document.querySelector('#btn');
        btn.onclick = () => {
            const result = cb.value;
            alert(result); // on
        };
    </script>
    
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
        avatar: avatarInput().value
      }
    }

    const id = e.target.dataset.id;
    
    Api.patch("/users/" + id, strongParams)
      .then(function(data) {
        
        let u = User.all.find((u) => u.id == data.id);
        let idx = User.all.indexOf(u);
        User.all[idx] = new User(data);
        
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
    <h3> Alright ${current_user.name}! Are you satisfied 
    with your hero?! </h3>
   
  
    <input type="submit" value="Yes i'm ready!" onclick="return Story.renderPartOne()">
    <br><br>
    OR click to edit 
    <br><br>
    <input type="submit" value="Take me back!" onclick="return User.renderEditFormTemplate(${current_user.id})">
    <br><br>
    <form id="delete">
      <div class="input-field">
        <label for="delete">Type name to Delete</label> <br>
        <input type="text" name="deletename" id="deletename">
      </div>
      <input type="submit" value="Are you sure?">
    </form>
    `
  }
  
  static renderConfirmUserForm() {
    resetMain()
    main().innerHTML = User.confirmUserForm()
    deletes().addEventListener("submit", User.deleteUser)
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