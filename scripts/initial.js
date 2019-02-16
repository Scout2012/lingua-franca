var API_BASE = "https://api.github.com";

async function verifyUsers(){
  var cards = [];
    var textfield = document.getElementsByClassName("username");
    for(var i = 0; i < textfield.length; i++){
      if(textfield[i].value != ''){
        var data = await checkUsername(textfield[i].value)
        if(data){
          // console.log("Good User!");
          await cards.push(new userCard(data.login, data.email, data.avatar_url ));
          
        }
      }
    }
    console.log(cards);
}



async function checkUsername(username){
  try {
    const API_ENDPOINT = `${API_BASE}/users/${username}`
    console.log(API_ENDPOINT)
    const request = await fetch(API_ENDPOINT);
    const data = await request.json();
    return data;
  }
  catch (e) {
    console.log(e);
    return false;
  }
}

class userCard {
  constructor(username, email, avatar_link){
    console.log("Constructor called" + username);
    this.email = (email != null) ? email : null
    this.avatar = avatar_link;
    this.username = username;
  }

  userCommits(){

  }

  userLanguage(repo){
      return repo.language
  }

  async repoRequest(){
    try {
      const API_ENDPOINT = `${API_BASE}/users/${this.username}/repos`;
      const request = await fetch(API_ENDPOINT);
      const data = await request.json();
      return data;
    }
    catch (e){
      console.log(e);
    }
  }
}
