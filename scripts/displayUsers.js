console.log("In displayUsers.js");


async function genHtmlCards(profileCards){
  console.log(profileCards)
  if (errs == 0){
    console.log("\tGenerating HTML for each user");

    let i = 0;
    while(i < profileCards.length){
      wack = await getLanguages(profileCards[i]).then((languages)=>{
        return ( getCommits(languages, profileCards[i]));
      }).then((commitLanguages)=>{
        return languageStrength(commitLanguages);
      });
      console.log(wack)
      let id = 'user' + (i+1);
      let canvasId = `canvas-${id}`;
      let user = profileCards[i].username;
      console.log(`\t\tProcessing user "${user}"`);
      let avatarSrc = profileCards[i].avatar;
      let link = `https://github.com/${user}`;
      let html = `
        <div class="card">
          <img src="${avatarSrc}" alt="${user}'s GitHub avatar" style="width:50%">
          <div class="media">
            <h4><a href="${link}"><b>${user}</b></a></h4>
            <p>Skill Set</p>
            <img src="pixel.png" alt="peachy" style="display:none;">
          </div>
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
  for(var i = 0; i < repos.length && (repos[i].language) !== null; i++){
    languages.push(repos[i].language)
  }
  return languages;
}

async function getCommits(languages, profileCard){
  var commitLangs = {};
  const repos = await profileCard.repoRequest();
  // const commitsOnLang = await profileCard.userLanguage();
  for(var i = 0; i < repos.length; i++){
    if(!commitLangs[repos[i].language] && repos[i].language != null){
      commitLangs[repos[i].language] = 1;
    }
    var commits = await commitsRequest(profileCard.username, repos[i].name).then((commits)=>{
      if(commits){
        for(var j = 0; j <  commits.length && commits[j].author; j++){
          if(repos[i].language != null)
            if((commits[j].author.login) == profileCard.username){
              commitLangs[repos[i].language] += 1;
            }
        }
      }
    });
}
// console.log('commit languages: '+commitLangs);
return commitLangs;
}

async function commitsRequest(username, reponame){
  try {
    const API_ENDPOINT = `${API_BASE}/repos/${username}/${reponame}/commits`;
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
