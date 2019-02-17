console.log("In displayUsers.js");


async function genHtmlCards(profileCards){
  console.log(profileCards)
  if (errs == 0){
    console.log("Generating HTML for each user");

    let i = 0;
    while(i < profileCards.length){
      let id = 'user' + (i+1);
      let canvasId = `canvas-${id}`;
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
            <p>Skill Set</p>
            <div class="canvas-holder">
              <canvas id=${canvasId}></canvas>
            </div>
            <img onload="buildChart('${canvasId}','Skills',${languages},${commitCounts});" src="pixel.png" alt="peachy" style="display:none;">
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
