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
        // console.log(h1n1Country);   
    }
  }
  // console.log(sarsCountry);

  
  //Create arrays with cases accumulative cases per day 
  coronaCases = [];
  
  for (var i = 0; i < 23; i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < coronaCountry.length; j++){
    
     total += coronaCountry[j][day_string];
    //  console.log(coronaCases);
  
    }
    coronaCases.push(total);
    parseInt(coronaCases)
  }
  h1n1Cases = [];
  
  for (var i = 0; i < 44; i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < h1n1Country.length; j++){
    
     total += h1n1Country[j][day_string];
    //  console.log(coronaCases);
  
    }
    h1n1Cases.push(total);
    parseInt(h1n1Cases)
  }
  sarsCases = [];
  d_string = [];
  
  for (var i = 0; i < 116; i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < sarsCountry.length; j++){
    
     total += sarsCountry[j][day_string];
    //  console.log(coronaCases);
  
    }
    sarsCases.push(total);
    d_string.push(day_string);
    parseInt(sarsCases)
    
  }
  // console.log(d_string)

  // console.log(h1n1Cases)

Highcharts.chart('confirmed_cases_chart', {
  chart: {
    backgroundColor: '#d4d4dc',
      type: 'spline'
  },
  title: {
      text: 'Comparison Disease Confirmed Cases '
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
          text: 'Number of Confirmed Cases'}
  },
  tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x} days: {point.y} cases '
  },

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