function totalLabels(cases, deaths, day_num){
  var cases_sum = 0;
  var deaths_sum = 0;
  var day_string = 'Day ' + String(day_num);
  var cases_label = document.getElementById("total_confirmed_cases");
  var deaths_label = document.getElementById("total_death_cases");
  for (country in cases){
    console.log(country);
    if((cases[country]['Virus'] == 'Coronavirus') && (day_num > 23)){
      cases_sum += cases[country]['Day 23'];
      console.log(cases_sum);
    }
    else if((cases[country]['Virus'] == 'H1N1') && (day_num > 44)){
      cases_sum += cases[country]['Day 44'];
    }
    else{
      cases_sum += cases[country][day_string];
    }
  }

  for (country in deaths){
    if((deaths[country]['Virus'] == 'Coronavirus') && (day_num > 23)){
      deaths_sum += deaths[country]['Day 23'];
    }
    else if((deaths[country]['Virus'] == 'H1N1') && (day_num > 44)){
      deaths_sum += deaths[country]['Day 44'];
    }
    else{
      deaths_sum += deaths[country][day_string];
    }
  }
  cases_label.innerText = 'Total Cases: ' + String(cases_sum);
  deaths_label.innerText = 'Total Deaths: ' + String(deaths_sum);
}