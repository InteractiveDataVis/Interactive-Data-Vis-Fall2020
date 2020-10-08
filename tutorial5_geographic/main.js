/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.8,
  height = window.innerHeight * 0.8,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };
let svg;


/* APPLICATION STATE */
let state = {
  geojson: null,
  hover: {
    latitude: null,
    longitude: null,
  },
};


/* LOAD DATA */
Promise.all([
  d3.json("../data/usState.json"),
]).then(([geojson]) => {
  state.geojson = geojson;
  console.log("state: ", state);
  init();
});


/* INITIALIZING FUNCTION */
function init() {

  const GradCenterCoord = { latitude: 40.7423, longitude: -73.9833 };

  svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  
  const projection = d3.geoAlbersUsa()
    .fitSize([width, height], state.geojson)

  const geoPathFunc = d3.geoPath(projection)

  const usStates = svg.selectAll("path.map-lines")
    .data(state.geojson.features)
    .join("path")
    .attr("class", "map-lines")
    .attr("d", d => geoPathFunc(d))
    .attr("fill", "pink")

  const dot = svg.append("circle")
    .attr("r", 10)
    .style("transform", () => {
      const proj = projection([GradCenterCoord.longitude, GradCenterCoord.latitude])
      const x = proj[0]
      const y = proj[1]
      // const [x,y] = projection([GradCenterCoord.longitude, GradCenterCoord.latitude])
      return `translate(${x}px,${y}px)`})

  
  draw();
}

/* DRAW FUNCTION */
function draw() {


}
