console.log("In initial.js");
var API_BASE = "https://api.github.com";

var userCards = [];
if (errs == 0 && users){
    console.log(`\tChecking that all GitHub users exists`);
    userCards = verifyUsers().then( (cards) => {
        genHtmlCards(cards).then(()=>{
          postIntersection(cards);
          console.log(cards);
        });
        // console.log(cards);
    });
}

async function genHtmlCards(profileCards){
  // console.log(profileCards)

  if (errs == 0){
    console.log("Generating HTML for each user");

    let i = 0;
    while(i < profileCards.length){
      let id = 'user' + (i+1);
      let canvasId = `canvas-${id}`;
      let skillId = `skill-${id}`;
      let user = profileCards[i].username;
      console.log(`\tProcessing user "${user}"`);
      let avatarSrc = profileCards[i].avatar;
      let link = `https://github.com/${user}`;

      let languages = await getLanguages(profileCards[i]);
        languages = removeDuplicates(languages);
        profileCards[i].languages = languages;
      console.log("\t\t"+user+'\'S LANGUAGES: '+languages);
      let commitCounts = [];
      let commitLangs = await getCommits(languages, profileCards[i]);
      if (commitLangs && Object.keys(commitLangs).length != 0){
        for(let lang of languages){
            if(commitLangs[lang]){
                console.log("\t\t\t"+user +"'s language "+ lang + " HAS " + commitLangs[lang] + " COMMITS");
                commitCounts.push(commitLangs[lang]);
            } else{
                console.log("\t\tFOUND NO COMMITS FOR "+lang);
                commitCounts.push(0);
            }
        }
      } else{
        console.log("\t\tERROR!!! commitLangs wasn't populated");
      }
      console.log("\t\t"+user+"'S COMMITS : " + commitCounts);

      languages = stringListToString(languages);
      commitCounts = '[' + commitCounts.join(',') + ']';

      let html = `
        <div class="card">
          <img src="${avatarSrc}" alt="${user}'s GitHub avatar" style="width:50%">
          <div class="media">
            <h4><a href="${link}"><b>${user}</b></a></h4>
            <p id=${skillId}>Skill Set</p>
            <div class="canvas-holder">
              <canvas id=${canvasId}></canvas>
            </div>
            <img onload="buildChart('${canvasId}','Skills',${languages},${commitCounts});" src="pixel.png" alt="peachy" style="display:none;">
          </div>
        </div>
      `;

      document.getElementById(id).innerHTML = html;
      postSkills(profileCards[i], skillId);
      i += 1;
    }
  }
}

function postSkills(profile, id){
  var addSkills = document.createElement('p');
  var comment = profile.languages;
  addSkills.textContent = comment;
  document.getElementById(id).appendChild(addSkills);
}

function postIntersection(profileCards){
  // for(var i = 0; i < profileCards.length; i++){
  //   for(var j = i+1; j < profileCards.length; j++){
  //   }
  // }
  var intersectedLangs = [];
  for(var i = 0; i < profileCards.length; i++){
    for(var j = i+1; j < profileCards.length; j++ ){
      let shared = getIntersection(profileCards[i], profileCards[j]);
      console.log(shared)
      if(shared){
        for(let lang of shared){
          intersectedLangs.push(lang);
        }
      }
    }
  }
  intersectedLangs = removeDuplicates(intersectedLangs);
  console.log("Intersecting langs: " + intersectedLangs);

  var intersectionImg = "";
  let html = '';
  for(let lang of intersectedLangs){
    let intersects = 0;
    for(let usr of profileCards){
      if(usr.languages.includes(lang)){
        intersects += 1;
      }
    }
    console.log("LANGUAGE "+lang+" SHARED BY "+intersects+" USERS");
    html += `
      <body id="flex">
        <div class="row">
          <div class="container">
            <div class="jumbotron text-center col-mid-6">
              <h2>${lang}</h2>
              <h1>${intersects} users share this skill</h1>
            </div>
          </div>
        </div>
      </body>
    `;
  }
  html += `
  <div class = "container">
    <div class="jumbotron text-center col-mid-6">
      <a href="index.html" style="text-decoration:none;">
      <img src="home.png" class="rounded float-right" style="width:10%;"  id="home" >
      <p style="color:black;margin-top:10px;">Back to home screen</p>
    </a>
  `;
  console.log("ADDING THIS HTML:\n"+html);
  document.getElementById('suggestions').innerHTML = html;
}

async function verifyUsers(){
    let cards = [];
    for(var i = 0; i < users.length; i++){
      if(users[i] != ''){
        console.log(`\t\tChecking user ${users[i]}`);
        var data = await checkUsername(users[i])
        if(data){
          await cards.push(new userCard(data.login, data.email, data.avatar_url ));
        }
      }
    }
    return cards;
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
    const possibleResponse = {
      200: "Success",
      403: "You've most likely made too many requests in too little time. Try again later",
      404: "Page not found",
      409: "Forbidden access to the server"
    };
    const detailError = `${possibleResponse[e.statusCode]} code received with response ${possibleResponse[e.statusCode].value}`;
    console.log(detailError);
    let html =
    `<div id="error"
          <body>
              <h2 >Error</h2>
              <p id="details"></p>
              <a href="index.html"><strong>Try again.</strong></a>
          </body>
      </div>`;
    document.getElementById("submit-results").innerHTML = html;
    let newDetail = document.createElement('p');
    newDetail.textContent = detailError;
    document.getElementById("details").append(newDetail);
    errs += 1;
  }
}

class userCard {
  constructor(username, email, avatar_link){
    console.log("\t\tConstructor called" + username);
    this.email = (email != null) ? email : null
    this.avatar = avatar_link;
    this.username = username;
    this.languages = [];
  }

  userCommits(repo){
    return repo.commit
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
