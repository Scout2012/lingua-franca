var users = []

var urlString = window.location.href;
var url = new URL(urlString);
for(let i of [1,2,3,4]){
    let param = 'user' + i;
    let user = url.searchParams.get(param);
    if(user){
        users.push(user);
    }
}

for(var i = 0; i < users.length; i++){
  console.log(users[i]);
}

document.getElementById()
