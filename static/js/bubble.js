
countriesList = [];
casesCount = [];
continents_array = getContinents();
function bubbleValues(cases,deaths,slide_num) {
    bubblecheckbox = document.getElementById('bubblecheck')
    if(bubblecheckbox.checked == false){
    response = cases;
    }
    else{
        response = deaths;
    };
    lastDayNumber = slide_num;
    lastDay = "Day "+ String(lastDayNumber);
    if(slide_num > 44){
        corona_day = 'Day 23'
        h1n1_day = 'Day 44'
    }
    else if (slide_num>23)
    {
        corona_day = 'Day 23'
        h1n1_day = lastDay
    }
    else {
        corona_day = lastDay
        h1n1_day = lastDay
    };
    if (active_buttons.length == 1){
        switch(active_buttons[0]){
            case "H1N1":
        lastDay = h1n1_day;
        eu_list_new = [];
        na_list_new = [];
        af_list_new = [];
        as_list_new = [];
        oc_list_new = [];
        sa_list_new = [];
        for(country in response){
            if(continents_array[0].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var eu_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    eu_list_new.push(eu_dict)
                }
            }
            else if (continents_array[5].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var na_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    na_list_new.push(na_dict);
                }
            }
            else if (continents_array[1].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var af_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    af_list_new.push(af_dict);
                }
            }
            else if (continents_array[2].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var as_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    as_list_new.push(as_dict);
                }
            }
            else if (continents_array[3].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var oc_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    oc_list_new.push(oc_dict);
                }
            }
            else if (continents_array[4].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var sa_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    sa_list_new.push(sa_dict);
                }
            }
        }
    

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%',
                
            },
            title: {
                text: `<strong>${active_buttons[0]}</strong>  Distribution by Continent`
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}  Confirmed Cases<sub></sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
        
            series: [{
                name: 'Europe',
                data: eu_list_new
                
            },{
                name: 'Asia',
                data: as_list_new
            },{
                name: 'North America',
                data: na_list_new
            },{
                name: 'South America',
                data: sa_list_new
            },{
                name: 'Oceania',
                data: oc_list_new
            },{
                name: 'Africa',
                data: af_list_new
            }]
            
        })
        break;
            case "SARS":
        lastDay =  "Day "+ String(lastDayNumber);
        eu_list_new = [];
        na_list_new = [];
        af_list_new = [];
        as_list_new = [];
        oc_list_new = [];
        sa_list_new = [];
        for(country in response){
            if(continents_array[0].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var eu_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    eu_list_new.push(eu_dict)
                }
            }
            else if (continents_array[5].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var na_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    na_list_new.push(na_dict);
                }
            }
            else if (continents_array[1].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var af_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    af_list_new.push(af_dict);
                }
            }
            else if (continents_array[2].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var as_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    as_list_new.push(as_dict);
                }
            }
            else if (continents_array[3].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var oc_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    oc_list_new.push(oc_dict);
                }
            }
            else if (continents_array[4].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var sa_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    sa_list_new.push(sa_dict);
                }
            }
        }
    

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%',
                
            },
            title: {
                text: `<strong>${active_buttons[0]}</strong>  Distribution by Continent`
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}  Confirmed Cases<sub></sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
        
            series: [{
                name: 'Europe',
                data: eu_list_new
                
            },{
                name: 'Asia',
                data: as_list_new
            },{
                name: 'North America',
                data: na_list_new
            },{
                name: 'South America',
                data: sa_list_new
            },{
                name: 'Oceania',
                data: oc_list_new
            },{
                name: 'Africa',
                data: af_list_new
            }]
            
        })
        break;
        case "Coronavirus":
        lastDay =  corona_day;
        eu_list_new = [];
        na_list_new = [];
        af_list_new = [];
        as_list_new = [];
        oc_list_new = [];
        sa_list_new = [];
        for(country in response){
            if(continents_array[0].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var eu_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    eu_list_new.push(eu_dict)
                }
            }
            else if (continents_array[5].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var na_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    na_list_new.push(na_dict);
                }
            }
            else if (continents_array[1].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var af_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    af_list_new.push(af_dict);
                }
            }
            else if (continents_array[2].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var as_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    as_list_new.push(as_dict);
                }
            }
            else if (continents_array[3].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var oc_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    oc_list_new.push(oc_dict);
                }
            }
            else if (continents_array[4].includes(response[country]['Country'])){
                if (response[country][lastDay] != 0){
                    var sa_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    sa_list_new.push(sa_dict);
                }
            }
        }
    

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%',
                
            },
            title: {
                text: `<strong>${active_buttons[0]}</strong>  Distribution by Continent`
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}  Confirmed Cases<sub></sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
        
            series: [{
                name: 'Europe',
                data: eu_list_new
                
            },{
                name: 'Asia',
                data: as_list_new
            },{
                name: 'North America',
                data: na_list_new
            },{
                name: 'South America',
                data: sa_list_new
            },{
                name: 'Oceania',
                data: oc_list_new
            },{
                name: 'Africa',
                data: af_list_new
            }]
            
        })
        break;
    }
    }

    else if (active_buttons.length>1) {

        lastDay = "Day "+ String(lastDayNumber);
        sars_list = []
        H1N1_list = []
        corona_list = []

        for(country in response){
            if (active_buttons.indexOf("SARS")!= -1 ){
                if (response[country][lastDay] != 0 && response[country]['Virus'] == "SARS"){
                    var sars_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    sars_list.push(sars_dict);
                };
            };
            if (active_buttons.indexOf("H1N1")!= -1 ){
                if (response[country][h1n1_day] != 0 && response[country]['Virus'] == "H1N1"){
                    var H1N1_dict = {
                        name : response[country]['Country'],
                        value : response[country][h1n1_day]
                    }
                    H1N1_list.push(H1N1_dict);
                };
            };
            if (active_buttons.indexOf("Coronavirus")!= -1 ){
                if (response[country][corona_day] != 0 && response[country]['Virus'] == "Coronavirus"){
                    var corona_dict = {
                        name : response[country]['Country'],
                        value : response[country][corona_day]
                    }
                    corona_list.push(corona_dict);
                };
            };
        };

    
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%',
                
            },
            title: {
                text: 'Disease Comparison'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}Confirmed Cases<sub></sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: true,
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
        
            series: [{
                name: 'SARS',
                data: sars_list
            },{
                name : 'H1N1',
                data:   H1N1_list
                
            },{
                name: 'Corona Virus',
                data: corona_list
            }]
        });
        
    };
};




