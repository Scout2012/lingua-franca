// Example usage:
// buildChart('chart-area','Language Proficiency',['Python','Javascript','CSS','HTML','C++','Java'], [30,20,10,10,20,10]);

// elementId must be the ID of the canvas
// titleInput is a string
// labelsInput must be an array of strings
// dataInput must be an array of numbers
function buildChart(elementId, titleInput, labelsInput, dataInput){
    var colors = [];
    for(let label of labelsInput){
        let color = intToRGB(hashCode(label));
        console.log("Color: " + color);
        colors.push( "#" + color );
    }

    var randomScalingFactor = function() {
      return Math.round(Math.random() * 100);
    };
    var config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: dataInput,
          backgroundColor: colors,
          label: titleInput
        }],
        labels: labelsInput
      },
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: titleInput
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };
    window.onload = function() {
      var ctx = document.getElementById(elementId).getContext('2d');
      window.myDoughnut = new Chart(ctx, config);
    };
    
    var ctx = document.getElementById(elementId).getContext('2d');
    window.myDoughnut = new Chart(ctx, config);
}
