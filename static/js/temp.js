function buildPlot() {
    /* data route */
  var url = "/api/cases";
  var svg = d3.select('.bars').append('svg')
  .attr("width", 1000)
  .attr("height", 1000)
  d3.json(url).then(function(response) {

    console.log(response)

    // svg.append('text')
    // .text(response)
    // var data = response;

    // var layout = {
    //   scope: "usa",
    //   title: "Pet Pals",
    //   showlegend: false,
    //   height: 600,
    //   geo: {
    //     scope: "usa",
    //     projection: {
    //       type: "albers usa"
    //     },
    //     showland: true,
    //     landcolor: "rgb(217, 217, 217)",
    //     subunitwidth: 1,
    //     countrywidth: 1,
    //     subunitcolor: "rgb(255,255,255)",
    //     countrycolor: "rgb(255,255,255)"
    //   }
    // };

    // Plotly.newPlot("bars", data, layout);


  });
}

buildPlot();
