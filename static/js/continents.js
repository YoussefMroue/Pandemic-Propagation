
function getContinents(){
continents_json = d3.json("/api/continents");
eu_list = [];
na_list = [];
af_list = [];
as_list = [];
oc_list = [];
sa_list = [];

continents_json.then(function(response2){
    for (coun in response2){
        if(response2[coun]['continent'] == 'EU'){
            eu_list.push(response2[coun]['0']);
        }
        else if(response2[coun]['continent'] == 'AF'){
            af_list.push(response2[coun]['0']);
        }
        else if(response2[coun]['continent'] == 'AS'){
            as_list.push(response2[coun]['0']);
        }
        else if(response2[coun]['continent'] == 'OC'){
            oc_list.push(response2[coun]['0']);
        }
        else if(response2[coun]['continent'] == 'SA'){
            sa_list.push(response2[coun]['0']);
        }
        else{
            na_list.push(response2[coun]['0']);
        }
    }
})
return [eu_list,af_list,as_list,oc_list,sa_list,na_list];
};



