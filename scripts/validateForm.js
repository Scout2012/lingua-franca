// ========== VALIDATE FORM PARAMETERS ==========

// ---------- Fetch the user parameters passed through the form

let errorCase = false;
let urlString = window.location.href;
let url = new URL(urlString);

let users = [];
for(let i of [1,2,3,4]){
    let param = 'user' + i;
    let user = url.searchParams.get(param);
    if(user){
        users.push(user);
    }
}
console.log("Retrieved form inputs: " + users);

if (users.length == 0){
    console.log("ERROR: no usernames were passed");

    let html = 
    `<div id="error"
        <body>
            <h2>Error</h2>
            <p>Please enter at least one valid GitHub username.</p>
            <a href="index.html"><strong>Try again.</strong></a>
        </body>
    </div>`;
    document.getElementById('submit-results').innerHTML = html;
    errorCase = true;
}

console.log("Checking for non-existing users");
for(let user of users){
    console.log(`\tVerifying user ${user}`);

}

if (!errorCase){
    console.log("Generating HTML for each user");

    let i = 0;
    while(i < users.length){
        let user = users[i];
        console.log(`\tUser: ${user}`);
        let id = 'user' + (i+1);
        console.log(`\tHTML id: ${id}`);
        let avatarSrc = "https://avatars3.githubusercontent.com/u/32445362?v=4";
        console.log(`\tAvatar: ${avatarSrc}`);

        let html = `
            <h4 style="margin-left:5%;">${user}</h4>
            <img src="${avatarSrc}" class="align-self-start mr-3" style="width:60px;margin-left:5%;">
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

