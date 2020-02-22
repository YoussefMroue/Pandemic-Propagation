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

width = window.innerHeight/3;
height = window.innerHeight/3;
sphere = ({type: "Sphere"});
tilt = 20;
canvas = d3.select("#globe").append("canvas")
.attr("width", width)
.attr("height", height);
container = canvas.node();
context = container.getContext('2d')
// const context = DOM.context2d(width, height);
const projection = d3.geoOrthographic().fitExtent([[10, 10], [width - 10, height - 10]], sphere);
const path = d3.geoPath(projection, context);

function drawGlobe(cases){
  var world = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
  world.then(function(result){
    land = topojson.feature(result, result.objects.land);
    borders = topojson.mesh(result, result.objects.countries, (a, b) => a !== b);
    countries = topojson.feature(result, result.objects.countries).features;
    sphere = ({type: "Sphere"});
    tilt = 20;
    width = 360;
    height = 360;
    name = ""
    // console.log(cases);

    let p1, p2 = [0, 0], r1, r2 = [0, 0, 0];
    var delay_time = 0;
    for (var country in cases) {
      // console.log(cases[country]);
      countries.find(country => {
        
      })
      // console.log(countries);
      //name = country.properties.name;
      //delay_time += 2000
      //p1 = p2, p2 = d3.geoCentroid(country);
      //r1 = r2, r2 = [-p2[0], tilt - p2[1], 0];

      //transitions(p1,p2,r1,r2, delay_time, country);
    }
  });
};

// var world = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
// world.then(function(result){
//   land = topojson.feature(result, result.objects.land);
//   borders = topojson.mesh(result, result.objects.countries, (a, b) => a !== b);
//   countries = topojson.feature(result, result.objects.countries).features;
//   sphere = ({type: "Sphere"});
//   tilt = 20;
//   width = 360;
//   height = 360;
//   name = ""

//   let p1, p2 = [0, 0], r1, r2 = [0, 0, 0];
//   var delay_time = 0;
//   for (const country of countries) {
//     name = country.properties.name;
//     //console.log(country.Country);
//     delay_time += 2000
//     p1 = p2, p2 = d3.geoCentroid(country);
//     r1 = r2, r2 = [-p2[0], tilt - p2[1], 0];

//     transitions(p1,p2,r1,r2, delay_time, country);
//   }
// });

function render(country, arc) {
  context.clearRect(0, 0, width, height);
  context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
  context.beginPath(), path(country), context.fillStyle = "#f00", context.fill();
  context.beginPath(), path(borders), context.strokeStyle = "#fff", context.lineWidth = 0.5, context.stroke();
  context.beginPath(), path(sphere), context.strokeStyle = "#000", context.lineWidth = 1.5, context.stroke();
  context.beginPath(), path(arc), context.strokeStyle = "#f00", context.stroke();
  return context.canvas;
}

function transitions(p1,p2,r1,r2, delay_time, country){
  const ip = d3.geoInterpolate(p1, p2);
  const iv = Versor.interpolateAngles(r1, r2);
  d3.transition()
  .delay(delay_time)
  .duration(1000)
  .tween("render", () => t => {
    projection.rotate(iv(t));
    render(country, {type: "LineString", coordinates: [p1, ip(t)]});
  })
  .transition()
  .tween("render", () => t => {
    render(country, {type: "LineString", coordinates: [ip(t), p2]});
  })
  .end();
}

