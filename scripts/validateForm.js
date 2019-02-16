// ========== VALIDATE FORM PARAMETERS ==========

// ---------- Fetch the user parameters passed through the form
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
    // Error: User has not entered any usernames
    let html = 
    `
        <body>
            <h2>Error</h2>
            <p>Please enter at least one valid GitHub username.</p>
            <a href="index.html"><strong>Try again.</strong></a>
        </body>
    `;
    document.getElementById('submit-results').innerHTML = html;

}

for(let user of users){
    // Make sure each user exists
    console.log("Checking user " + user + "...");
}