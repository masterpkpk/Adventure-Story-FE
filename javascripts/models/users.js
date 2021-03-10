class User {

  static baseUrl = "http://localhost:3000"

  constructor(name) {
    this.name = name
  }

  static async getUsers() {
 
    const data = await Api.get("/users");

    
    users = data
    
  }
  
}