function totalcasesData(data){
    sarsdata = [];
    h1n1data = [];
    coronadata = [];
    
    for (var i = 0; i < data.length; i++) {
      
      if (data[i].Virus == 'Coronavirus') {
          coronadata.push(data[i]);
             
        }
      
      else if (data[i].Virus == 'SARS') {
          sarsdata.push(data[i]);
          
      }
      
      else {
          h1n1data.push(data[i]);
            
      }
    }
    console.log(sarsdata);

    // Select virus buttons
    SARS_button = d3.select("#SARS");
    H1N1_button = d3.select("#H1N1");
    Coronavirus_button = d3.select("#Coronavirus");

  
  
    //Create arrays with cases accumulative cases per day 
    coronaCas = [];
    coronaTotal = [];
    
    for (var i = 0; i < 23; i++) {
      day_string = 'Day ' + String(i);
      total = 0;
      for (var j = 0; j < coronadata.length; j++){
      
       total +=  coronadata[j][day_string];
       
    
    
      }
      coronaCas.push(total);
      parseInt(coronaCas)
    }

    var coronaTotal= function(coronaCas){
        return coronaCas.reduce(function(a,b){
          return a + b
        }, 0);
      }
    
    console.log(coronaTotal)
    
    
    
    h1n1Cas = [];
    
    for (var i = 0; i < 44; i++) {
      day_string = 'Day ' + String(i);
      total = 0;
      for (var j = 0; j < h1n1data.length; j++){
      
       total += h1n1data[j][day_string];
     
      }
      h1n1Cas.push(total);
      parseInt(h1n1Cases)
    }
    var h1n1Total= function(h1n1Cas){
        return h1n1Cas.reduce(function(a,b){
          return a + b
        }, 0);
      }


    sarsCas = [];
    d_string = [];
    
    for (var i = 0; i < 116; i++) {
      day_string = 'Day ' + String(i);
      total = 0;
      for (var j = 0; j < sarsdata.length; j++){
      
       total += sarsdata[j][day_string];
      //  console.log(coronaCases);
    
      }
      sarsCas.push(total);
      d_string.push(day_string);
      parseInt(sarsCas)
    }
    }
    var sarsTotal= function(sarsCas){
        return sarsCas.reduce(function(a,b){
          return a + b
        }, 0);
      }



// Select the counter h1 element when clicking SARS button 
var counter = d3.select("#total_confirmed_cases");
SARS_button.on("click", function() {
    // Select the current count
    var currentCount = parseInt(counter.text());
  
  
    // Set the counter h1 text to the new count
    counter.text(`SARS Number of Cases: ${sarsTotal}`);
  

  });

// Select the counter h1 element when clicking H1N1 button 
var counter = d3.select("#total_confirmed_cases");
H1N1_button.on("click", function() {
    // Select the current count
    var currentCount = parseInt(counter.text());
  
  
    // Set the counter h1 text to the new count
    counter.text(`SARS Number of Cases: ${h1n1Total}`);
  

  });

  // Select the counter h1 element when clicking Coronavirus button 
  var counter = d3.select("#total_confirmed_cases");
  H1N1_button.on("click", function() {
      // Select the current count
      var currentCount = parseInt(counter.text());
    
    
      // Set the counter h1 text to the new count
      counter.text(`SARS Number of Cases: ${coronaTotal}`);
    
  
    });
    
  
  

