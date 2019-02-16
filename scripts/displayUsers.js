console.log("In displayUsers.js");

if (errs == 0){
    console.log("\tGenerating HTML for each user");

    let i = 0;
    while(i < users.length){
        let id = 'user' + (i+1);
        let user = users[i];
        console.log(`\t\tProessing user "${user}"`);
        let avatarSrc = "https://avatars3.githubusercontent.com/u/32445362?v=4";
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