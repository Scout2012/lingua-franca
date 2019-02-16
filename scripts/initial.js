var API_BASE = "https://api.github.com";


var btn1 = document.getElementById("index-submit")

btn1.onclick = getUsernames;
//
// function verifyUser(){
//   var userData = [];
//   var textfield = document.getElementsByClassName("username");
//   for(var i = 0; i < textfield.length; i++){
//     if(textfield[i].value != ''){
//       checkUsername(textfield[i].value.toString()).then((res)=>{
//         //if is a user
//         var parsed = JSON.parse(res);
//         // console.log(parsed);
//         userData.push(new userCard(parsed.login));
//         var span_del = document.getElementById("error-msg");
//         if(span_del != null){
//           span_del.removeChild(span_del.childNodes[0]);
//         }
//         return parsed
//       }, (rej)=>{
//         //not a user
//         document.getElementById("error-msg").innerHTML = "<p>WOAH, BAD INFORMATION</p>";
//         return null
//       }).then((result)=>{
//         console.log(result);
//       });
//     }
//   }
//   //need to fix localStorage, shits broken
//   return userData;
// }

function getUsernames(){
  var usernames = [];
  var textfield = document.getElementsByClassName("username");
  for(var i = 0; i < textfield.length; i++){
    verifyUser(textfield[i].value).then(
      (res)=>{
        usernames.push(res);
        console.log("Hello"+res);
      });
  }
  // console.log(usernam es);
}

function verifyUser(user){
  // var textfield = document.getElementsByClassName("username");
  // for(var i = 0; i < textfield.length; i++){
  return new Promise((resolve)=>{
    if(user != ''){
      checkUsername(user).then(
        (res)=>{
          return user;
        }
      );
    }
    // }
    return false;
  });
}



function checkUsername(username){
  // console.log(username);
  return new Promise((res, rej)=>{
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = ()=>{
          if (xhttp.readyState == 4 && xhttp.status == 200){
            res(xhttp.response);
          }
          if(xhttp.readyState == 4 && xhttp.status != 200){
            rej("Some wack stuff happened: " + Error(xhttp.status));
          }
      }
    xhttp.open("GET", API_BASE + "/users/" + username)
    xhttp.setRequestHeader("User-Agent", "request");
    xhttp.send();
  });
}

class userCard {
  constructor(username){
    console.log("Constructor called" + username);
    this.username = username;
  }

  get userRepos(){
    genericRequest("GET", this.username).then((res)=>{
      if(res.length !== 0 && res !== "undefined"){
        return res;
      }
    }, (rej)=>{
      return Error("Couldn't fetch repos");
    });
  }

  genericRequest(method, username){
    return new Promise((res, rej)=>{
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if (xhttp.readyState == 4 && xhttp.status == 200){
              res(xhttp.response);
            }
            if(xhttp.readyState == 4 && xhttp.status != 200){
              rej("Some wack stuff happened: " + Error(xhttp.status));
            }
        }
      xhttp.open("GET", API_BASE + "/users/" + "/" + this.username + "/repos")
      xhttp.setRequestHeader("User-Agent", "request");
      xhttp.send();
    });
  }

}
