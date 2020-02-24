//Filter countries for each virus
function deathCasesData(data){
    sarsvirusCountry = [];
    h1n1virusCountry = [];
    coronavirusCountry = [];
    
    for (var i = 0; i < data.length; i++) {
      
      if (data[i].Virus == 'Coronavirus') {
        coronavirusCountry.push(data[i]);
              // console.log(coronaCountry);
        }
      
      else if (data[i].Virus == 'SARS') {
        sarsvirusCountry.push(data[i]);
          // console.log(sarsCountry);
      }
      
      else {
        h1n1virusCountry.push(data[i]);
          // console.log(h1n1Country);   
      }
    }
    //Create arrays with cases accumulative cases per day 
  coronaDeathCases = [];
  
  for (var i = 0; i < 23; i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < coronavirusCountry.length; j++){
    
     total += coronavirusCountry[j][day_string];
    //  console.log(coronaCases);
  
    }
    coronaDeathCases.push(total);
    parseInt(coronaDeathCases)
  }
  h1n1DeathCases = [];
  
  for (var i = 0; i < 44; i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < h1n1virusCountry.length; j++){
    
     total += h1n1virusCountry[j][day_string];
    //  console.log(coronaCases);
  
    }
    h1n1DeathCases.push(total);
    parseInt(h1n1DeathCases);
  }
  sarsDeathCases = [];
  d_string = [];
  
  for (var i = 0; i < 116; i++) {
    day_string = 'Day ' + String(i);
    total = 0;
    for (var j = 0; j < sarsvirusCountry.length; j++){
    
     total += sarsvirusCountry[j][day_string];
    //  console.log(coronaCases);
  
    }
    sarsDeathCases.push(total);
    d_string.push(day_string);
    parseInt(sarsDeathCases)
    
  }
  console.log(d_string)

  console.log(h1n1Cases)

  
  Highcharts.chart('death_cases_chart', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Coronavirus, H1N1, and SARS Death Cases',
    },
    subtitle: {
        text: 'Comparison Chart Dates for SARS 03/17/03 to 04/21/04 , H1N1 are from 5/23/2009 to 7/6/09, and CORONAVIRUS  from 1/21/20 to 2/14/20 '
    },
    xAxis: {
      title: {
          text: 'Outbreak Days'
      },
      categories: d_string
  },
    yAxis: {
        title: {
            text: 'Number of Deaths'}
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
  
    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
  
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