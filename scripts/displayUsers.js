console.log("In displayUsers.js");



async function genHtmlCards(profileCards){
  console.log(profileCards)
  if (errs == 0){
    console.log("\tGenerating HTML for each user");

    let i = 0;
    while(i < profileCards.length){
      var langs = await getLanguages(profileCards[i]).then((langs)=>{
        console.log(langs)
      });
      let id = 'user' + (i+1);
      let user = profileCards[i].username;
      console.log(`\t\tProcessing user "${user}"`);
      let avatarSrc = profileCards[i].avatar;
      let link = `https://github.com/${user}`;
      let html = `
      <h4 style="margin-left:5%;">
      <a href=${link}>${user}</a></h4>
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
async function getLanguages(profileCards){
  var languages = [];
  const repos = await profileCards.repoRequest();
  for(var i = 0; i < repos.length; i++){
    languages.push(repos[i].language)
  }
  return languages
}
