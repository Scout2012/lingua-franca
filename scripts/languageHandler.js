// var users = []
//
// var urlString = window.location.href;
// var url = new URL(urlString);
// for(let i of [1,2,3,4]){
//     let param = 'user' + i;
//     let user = url.searchParams.get(param);
//     if(user){
//         users.push(user);
//     }
// }


// async function getCards(userCards){
//   try {
//     const cards = await userCards;
//     if(typeof(cards) !== 'undefined')
//   }
//   catch(e) {
//     console.log(e)
//   }
//
//   return cards
// }
// cards = getCards(userCards);
//
// console.log(cards);


function getIntersection(profileCard1, profileCard2){
  var intersect = intersection(profileCard1.languages, profileCard2.languages);
  if(intersect){
    return intersect
  } else {
    return null;
  }
}

function getSkills(profileCard){
    return profileCard.languages;
}


// document.getElementById()
