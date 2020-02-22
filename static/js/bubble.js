
countriesList = [];
casesCount = [];
lastDayNumber = 12;
lastDay = "Day "+ String(lastDayNumber);
function bubbleValues(response) {
    if (active_buttons.length == 1){

        lastDay = "Day "+ String(lastDayNumber);
        data_list = []
        for(country in response){
            if (response[country][lastDay] != 0){
                var data_dict = {
                    name : response[country]['Country'],
                    value : response[country][lastDay]
                }
                data_list.push(data_dict);
            };
        }
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '100%',
                
            },
            title: {
                text: 'Distribution by Continent'
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
                data: data_list
                
            }]
        });
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
                if (response[country][lastDay] != 0 && response[country]['Virus'] == "H1N1"){
                    var H1N1_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
                    }
                    H1N1_list.push(H1N1_dict);
                };
            };
            if (active_buttons.indexOf("Coronavirus")!= -1 ){
                if (response[country][lastDay] != 0 && response[country]['Virus'] == "Coronavirus"){
                    var corona_dict = {
                        name : response[country]['Country'],
                        value : response[country][lastDay]
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
                text: 'Distribution by Continent'
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


