class Versor {
  static fromAngles([l, p, g]) {
    l *= Math.PI / 360;
    p *= Math.PI / 360;
    g *= Math.PI / 360;
    const sl = Math.sin(l), cl = Math.cos(l);
    const sp = Math.sin(p), cp = Math.cos(p);
    const sg = Math.sin(g), cg = Math.cos(g);
    return [
      cl * cp * cg + sl * sp * sg,
      sl * cp * cg - cl * sp * sg,
      cl * sp * cg + sl * cp * sg,
      cl * cp * sg - sl * sp * cg
    ];
  }
  static toAngles([a, b, c, d]) {
    return [
      Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180 / Math.PI,
      Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180 / Math.PI,
      Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180 / Math.PI
    ];
  }
  static interpolateAngles(a, b) {
    const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
    return t => Versor.toAngles(i(t));
  }
  static interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    a2 -= a1, b2 -= b1, c2 -= c1, d2 -= d1;
    const x = new Array(4);
    return t => {
      const l = Math.hypot(x[0] = a1 + a2 * t, x[1] = b1 + b2 * t, x[2] = c1 + c2 * t, x[3] = d1 + d2 * t);
      x[0] /= l, x[1] /= l, x[2] /= l, x[3] /= l;
      return x;
    };
  }
  static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
    if (dot < 0) a2 = -a2, b2 = -b2, c2 = -c2, d2 = -d2, dot = -dot;
    if (dot > 0.9995) return Versor.interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]); 
    const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
    const x = new Array(4);
    const l = Math.hypot(a2 -= a1 * dot, b2 -= b1 * dot, c2 -= c1 * dot, d2 -= d1 * dot);
    a2 /= l, b2 /= l, c2 /= l, d2 /= l;
    return t => {
      const theta = theta0 * t;
      const s = Math.sin(theta);
      const c = Math.cos(theta);
      x[0] = a1 * c + a2 * s;
      x[1] = b1 * c + b2 * s;
      x[2] = c1 * c + c2 * s;
      x[3] = d1 * c + d2 * s;
      return x;
    };
  }
}


//Class Versor ran all our calculations to determine the Great Circle connecting our two points and interpolating the path

//we define our basic values for our projection mapping
width = window.innerHeight/3;
height = window.innerHeight/3;
sphere = ({type: "Sphere"});
tilt = 20;
canvas = d3.select("#globe").append("canvas")
.attr("width", width)
.attr("height", height);
container = canvas.node();
context = container.getContext('2d')
const projection = d3.geoOrthographic().fitExtent([[10, 10], [width - 10, height - 10]], sphere);
const path = d3.geoPath(projection, context);

function drawGlobe(cases){
  //we read our data in for the map
  var world = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
  world.then(function(result){
    //we get our geographical data out
    land = topojson.feature(result, result.objects.land);
    borders = topojson.mesh(result, result.objects.countries, (a, b) => a !== b);
    countries = topojson.feature(result, result.objects.countries).features;
    sphere = ({type: "Sphere"});
    tilt = 20;
    width = 360;
    height = 360;
    name = ""

    sorted = sortCases(cases); //this sorts by day the country first saw cases
    var infected = [];

    let p1, p2 = [0, 0], r1, r2 = [0, 0, 0];
    var delay_time = 0;
    //for each country in our list, we pass it through our render functions so that a line will be drawn to it and it will turn red
    for (var item in sorted) {
      country_list = countries.find(country => {
        return country.properties.name == sorted[item]['Country']; //we link our data sets
      })
      if (country_list != undefined){//if we have geographical data for our country...
        name = country_list.properties.name;
        var virus = sorted[item]['Virus'];
        var num_cases = 0;
        if (virus == 'Coronavirus'){//we pass the total number of cases the country recieved
          num_cases = sorted[item]['Day 23'];
        }
        else if (virus == 'SARS'){
          num_cases = sorted[item]['Day 116'];
        }
        else{
          num_cases = sorted[item]['Day 44'];
        }
        delay_time += 2000;
        p1 = p2, p2 = d3.geoCentroid(country_list);
        r1 = r2, r2 = [-p2[0], tilt - p2[1], 0];

        transitions(p1,p2,r1,r2, delay_time, country_list, infected, virus, num_cases); //this visualizes the values
      }
    }
  });
}


function render(country, arc, infected) {//renders the visuals
  context.clearRect(0, 0, width, height);
  context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
  context.beginPath(), path(country), context.fillStyle = "#f00", context.fill();
  for (nation in infected){//keeps countries we have already shown to be infected as red
    context.beginPath(), path(infected[nation]), context.fillStyle = "#f00", context.fill();
  }
  context.beginPath(), path(borders), context.strokeStyle = "#fff", context.lineWidth = 0.5, context.stroke();
  context.beginPath(), path(sphere), context.strokeStyle = "#000", context.lineWidth = 1.5, context.stroke();
  context.beginPath(), path(arc), context.strokeStyle = "#f00", context.stroke();
  return context.canvas;
}

function transitions(p1,p2,r1,r2, delay_time, country, infected, virus, num_cases){
  const ip = d3.geoInterpolate(p1, p2);
  const iv = Versor.interpolateAngles(r1, r2);
  d3.transition()
  .delay(delay_time)//this determines at what time the transition will start, so that our transitions don't all go off at once
  .duration(1000)//length of the transition
  .tween("render", () => t => {
    document.getElementById("globe_info").innerText = `${country.properties.name}: ${virus} Cases: ${num_cases}`;
    projection.rotate(iv(t));
    render(country, {type: "LineString", coordinates: [p1, ip(t)]}, infected);
  })
  .transition()
  .tween("render", () => t => {
    render(country, {type: "LineString", coordinates: [ip(t), p2]}, infected);
    infected.push(country);
  })
  .end();
}


//this function sorts the data by day country first saw cases
function sortCases(df){
  for(i=116; i>=0; i--){
    day = 'Day ' + String(i)
    df.sort(function(a,b){
      return b[day] - a[day];
    });
  }
  return df;
}