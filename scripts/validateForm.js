console.log("in validateForm.js");

// Fetch the user parameters passed through the form
var urlString = window.location.href;
var url = new URL(urlString);

var users = [];
for(let i of [1,2,3,4]){
    let param = 'user' + i;
    let user = url.searchParams.get(param);
    if(user){
        users.push(user);
    }
}
console.log("\tRetrieved form parameters: \n\t\t" + users);

if (users.length == 0){
    console.log("\tERROR: no usernames were passed");

    let html = 
    `<div class="error"
        <body>
            <h2>Error</h2>
            <p>Please enter at least one valid GitHub username.</p>
            <a href="index.html"><strong>Try again.</strong></a>
        </body>
    </div>`;
    document.getElementById('submit-results').innerHTML = html;
}