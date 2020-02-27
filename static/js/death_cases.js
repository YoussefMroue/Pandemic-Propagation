//Filter countries for each virus
function deathCasesData(data, day_num){
    sarsvirusCountry = [];
    h1n1virusCountry = [];
    coronavirusCountry = [];


   
    for (var i = 0; i < data.length; i++) {
      
      if (data[i].Virus == 'Coronavirus') {
        coronavirusCountry.push(data[i]);
        }
      
      else if (data[i].Virus == 'SARS') {
        sarsvirusCountry.push(data[i]);
      }
      
      else {
        h1n1virusCountry.push(data[i]);  
      }
    }
  //Create arrays with cumulative cases per day 
  // Create an empty array for corona deaths
  coronaDeathCases = [];
  
  //Iterate through each days up to day 23
  // Day 23 is the last day covered on the coronavirus dataset
  for (var i = 0; i <= Math.min(23,day_num); i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < coronavirusCountry.length; j++){
    
     total += coronavirusCountry[j][day_string];
   
  
    }
    coronaDeathCases.push(total);
    parseInt(coronaDeathCases)
  }
  // Create an empty array for h1n1 deaths
  h1n1DeathCases = [];
  
  //Iterate through each day up to day 44
  // Day 44 is the last day covered on h1n1 dataset
  for (var i = 0; i <= Math.min(23,day_num); i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < h1n1virusCountry.length; j++){
    
     total += h1n1virusCountry[j][day_string];
   
  
    }
    h1n1DeathCases.push(total);
    parseInt(h1n1DeathCases);
  }
  //Create an empty array for sars death cases and the list of all the days 
  // SARS Dataset cover the most days 116
  // Going to use day array for X labels for chart 
  sarsDeathCases = [];
  d_string = [];
  
  for (var i = 0; i <= Math.min(116,day_num); i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < sarsvirusCountry.length; j++){
    
     total += sarsvirusCountry[j][day_string];
  
  
    }
    sarsDeathCases.push(total);
    d_string.push(day_string);
    parseInt(sarsDeathCases)
    
  }


  // Select div to draw chart 
  Highcharts.chart('death_cases_chart', {
    chart: {
        backgroundColor: '#d4d4dc',
        type: 'spline'
    },
    //Add Title and Subtitles
    title: {
        text: 'Disease Comparison',
    },
    subtitle: {
        text: 'Number of Death Cases',
    },
    xAxis: {
      title: {
          text: 'Outbreak Days'
      },
      categories: d_string
  },
    yAxis: {
        gridLineColor: '#000000',
        title: {
            text: 'Number of Death Cases'}
    },
    //Add Tooltip
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x} days: {point.y} cases '
    },
    //Add animation 
    plotOptions: {
        series: {
            animation: {
                duration: 1500,
            },
            markers: {
                enabled: true
            }
        }
    },
    // Set up the colors
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5'],
    //Plug in the data 
    series: [{
        name: "Coronavirus",
        data: coronaDeathCases
    }, {
        name: "H1N1",
        data: h1n1DeathCases
    }, {
        name: "SARS",
        data: sarsDeathCases
      
        
    }],
  
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                    series: {
                        marker: {
                            radius: 2.5
                        }
                    }
                }
            }
        }]
    }
  
  });
  }