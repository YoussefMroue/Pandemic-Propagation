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
  }
  

}