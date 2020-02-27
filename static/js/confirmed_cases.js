//Filter countries for each virus
function confirmedCasesData(data){
  sarsCountry = [];
  h1n1Country = [];
  coronaCountry = [];
  
  for (var i = 0; i < data.length; i++) {
    
    if (data[i].Virus == 'Coronavirus') {
        coronaCountry.push(data[i]);
            // console.log(coronaCountry);
      }
    
    else if (data[i].Virus == 'SARS') {
        sarsCountry.push(data[i]);
        // console.log(sarsCountry);
    }
    
    else {
        h1n1Country.push(data[i]);
  

  
  //Create arrays with  cumulative cases per day for the coronavirus
  coronaCases = [];
  
  //Iterate thought every day up to day 23
  //Day 23 last day of the CoronaVirus dataset
  for (var i = 0; i < 23; i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < coronaCountry.length; j++){
    
     total += coronaCountry[j][day_string];
    
  
    }
    coronaCases.push(total);
    parseInt(coronaCases)
  }
  //Create arrays with cumulative cases per day for h1n1
  h1n1Cases = [];
  //Iterate thought every day up to day 44
  //Day 44 last day of the h1n1 dataset
  for (var i = 0; i < 44; i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < h1n1Country.length; j++){
    
     total += h1n1Country[j][day_string];
  
  
    }
    h1n1Cases.push(total);
    parseInt(h1n1Cases)
  }
   //Create arrays withcumulative cases per day for h1n1 and days 
  //Iterate thought every day up to day 116
  //Day 116 last day of the h1n1 dataset
  //116 days is the last value in the x axix
  sarsCases = [];
  d_string = [];
  
  for (var i = 0; i < 116; i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < sarsCountry.length; j++){
    
     total += sarsCountry[j][day_string];
  
  
    }
    sarsCases.push(total);
    d_string.push(day_string);
    parseInt(sarsCases)
    
  }
//Select div to start drawing chart 
Highcharts.chart('confirmed_cases_chart', {
  chart: {
    backgroundColor: '#d4d4dc',
      type: 'spline'
  },
  //Add titles and subtitles
  title: {
      text: 'Comparison Disease'
  },
  subtitle: {
    text: 'Number of Confirmed Cases'
},
//Add Axis 
  xAxis: {
    title: {
        text: 'Outbreak Days'
    },
    categories: d_string
},
  yAxis: {
    gridLineColor: '#000000',
      title: {
          text: 'Number of Confirmed Cases'}
  },
  //Add tooltips
  tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x} days: {point.y} cases '
  },
  //Add Animation
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

  colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5'],
  //Plug in data 
  series: [{
      name: "Coronavirus",
      data: coronaCases
  }, {
      name: "H1N1",
      data: h1n1Cases
  }, {
      name: "SARS",
      data: sarsCases
    
      
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