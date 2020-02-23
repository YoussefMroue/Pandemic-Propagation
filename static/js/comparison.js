// // Step 1: Set up our chart
// //= ================================

var svgWidth = 360;
var svgHeight = 360;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// // Step 2: Create an SVG wrapper,
// // append an SVG group that will hold our comparison-chart,
// // and shift the latter by left and top margins.
// // =================================
var svg = d3
  .select("Comparison Chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
  
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Step 3:
// //Import case data
// console.log(cases);
