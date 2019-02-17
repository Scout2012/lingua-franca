console.log("In algos.js");


// async function languageRatio(commitLangs){
//   var weighted = {};
//   for(langs in commitLangs){
//     if(!weighted[langs]){
//       weighted[langs] = Math.abs((commitLangs[langs] + Object.keys(commitLangs).length)/(Object.keys(commitLangs).length));
//     }
//   }
//   return await weighted
// }


async function languageStrength(commitLangs){
  var sortedArray = [];
  var largest = 0;
  var bestLang;
  for(item in commitLangs){
    if(commitLangs[item] > largest){
      largest = commitLangs[item];
      bestLang = item;
    }
  }
  return await bestLang;
}

function intersection(user1, user2){
  var t;
  if (user2.length > user1.length) t = user2, user2 = user1, user1 = t; // indexOf to loop over shorter
    return user1.filter(function (e) {
        return user2.indexOf(e) > -1;
    });
}
