var API_BASE = "https://api.github.com";

var initial_users = [];
for(let i of [1,2,3,4]){
    let param = 'user' + i;
    let user = url.searchParams.get(param);
    if(user){
        initial_users.push(user);
    }
}
verifyUsers();

async function verifyUsers(){
  var cards = [];
    for(var i = 0; i < users.length; i++){
      if(users[i] != ''){
        var data = await checkUsername(initial_users[i])
        if(data){
          await cards.push(new userCard(data.login, data.email, data.avatar_url ));
        }
      }
    }
}



async function checkUsername(username){
  try {
    const API_ENDPOINT = `${API_BASE}/users/${username}`
    // console.log(API_ENDPOINT)
    const request = await fetch(API_ENDPOINT);
    const data = await request.json();
    const status = await request.status;
    if(status != 200){
      throw {
        statusCode: status,
        userName: username
      }
    } else {
      return data;
    }
    return data;
  }
  catch (e) {
    console.log(e);
    const detailError = `${e.statusCode} code received. ${e.userName} is an invalid github username`;
    let html =
    `<div id="error"
          <body>
              <h2 >Error</h2>
              <p id="details">One or more of the GitHub usernames provided was invalid.</p>
              <a href="index.html"><strong>Try again.</strong></a>
          </body>
      </div>`;
    document.getElementById("submit-results").innerHTML = html;
    let newDetail = document.createElement('p');
    newDetail.textContent = detailError;
    document.getElementById("details").append(newDetail);

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
