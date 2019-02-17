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

function stringListToString(list){
    var quoted = [];
    for(let s of list){
        quoted.push("'"+s+"'");
    }
    return "[" + quoted.join(',') + "]";
}

function removeDuplicates(list){
  var uniques = [];
  for(let x of list){
    if (!uniques.includes(x)){
        uniques.push(x);
    }
  }
  return uniques;
}

// USAGE:
// let color = intToRGB(hashCode(<language name>));
function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}
function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}
