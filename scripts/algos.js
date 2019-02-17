console.log("In algos.js");


async function languageRatio(commitLangs){
  var weighted = {};
  for(langs in commitLangs){
    if(!weighted[langs]){
      weighted[langs] = Math.abs((commitLangs[langs] - Object.keys(commitLangs).length)/(Object.keys(commitLangs).length));
    }
  }
  return await weighted
}

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
  return bestLang;
}
  // for(lang in commitLangs){
  //   if(sortedArray.length == 0){
  //     sortedArray.push(commitLangs[lang]);
  //     largest = sortedArray[0];
  //   }
  //   for(var i = 0; i < (Object.keys(commitLangs).length); i++){
  //     if(commitLangs[lang] > sortedArray[i]){
  //       sortedArray.splice(i, 0, commitLangs[lang]);
  //       sortedArray.join();
  //     } else {
  //       sortedArray.push(commitLangs[lang]);
  //     }
  //   }
  // }
  // return await sortedArray;
