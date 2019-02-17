console.log("In displayUsers.js");


async function genHtmlCards(profileCards){
  console.log(profileCards)
  if (errs == 0){
    console.log("\tGenerating HTML for each user");

    let i = 0;
    while(i < profileCards.length){
      var langs = await getLanguages(profileCards[i]).then((languages)=>{
        return ( getCommits(languages, profileCards[i]));
      });
      let id = 'user' + (i+1);
      let user = profileCards[i].username;
      console.log(`\t\tProcessing user "${user}"`);
      let avatarSrc = profileCards[i].avatar;
      let link = `https://github.com/${user}`;
      let html = `
      <h4 style="margin-left:5%;">
      <a href=${link}>${user}</a console.log(commits);></h4>
      <a href=${link}>
      <img src="${avatarSrc}" class="align-self-start mr-3" style="width:60px;margin-left:5%;">
      </a>
      <div class="media-body">
      <p style="margin-left:5%;margin-top:1%;">Python: 30%</p>
      <p style="margin-left:5%;">Language: --%</p>
      <p style="margin-left:5%;">Language: --%</p>
      </div>
      `;

      document.getElementById(id).innerHTML = html;
      i += 1;
    }
  }
}

//null language means empty repo
async function getLanguages(profileCard){
  var languages = [];
  const repos = await profileCard.repoRequest();
  for(var i = 0; i < repos.length; i++){
    languages.push(repos[i].language)
  }
  return languages;
}

async function getCommits(languages, profileCard){
  var commitLangs = {};
  const repos = await profileCard.repoRequest();
  // const commitsOnLang = await profileCard.userLanguage();
  for(var i = 0; i < repos.length; i++){
    if(!commitLangs[repos[i].language]){
      commitLangs[repos[i].language] = 1;
    }
    var commits = await commitsRequest(profileCard.username, repos[i].name).then((commits)=>{
      if(commits){
        for(var j = 0; j <  commits.length; j++){
          if((commits[j].author.login) == profileCard.username){
            commitLangs[repos[i].language] += 1;
          }
        }
      }
    });
}
console.log('commit languages: '+JSON.stringify(commitLangs));
return commitLangs;

}

async function commitsRequest(username, reponame){
  try {
    const API_ENDPOINT = `${API_BASE}/repos/${username}/${reponame}/commits`;
    console.log(API_ENDPOINT)
    // console.log(API_ENDPOINT)
    const request = await fetch(API_ENDPOINT);
    const data = await request.json();
    const status = await request.status;
    if(status != 200){
      throw ("Error getting commits " + status);
    } else {
      return data;
    }
    return data;
  }
  catch (e) {
    console.log(e);
}
}
