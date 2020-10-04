/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let lineFunc;

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "United States",
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv("../data/populationOverTime.csv", d => ({
  year: new Date(d.Year, 0, 1),
  country: d.Entity,
  population: +d.Population,
})).then(raw_data => {
  console.log("raw_data", raw_data);
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {

  const selectElement = d3.select("#dropdown").on("change", function() {
    // `this` === the selectElement
    // 'this.value' holds the dropdown value a user just selected
    state.selection = this.value; // + UPDATE STATE WITH YOUR SELECTED VALUE
    console.log("new value is", this.value);
    draw(); // re-draw the graph based on this new selection
  });

  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")
    .data([...new Set(state.data.map(d => d['country']))])
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  selectElement.property("value", "United States")

  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  xScale = d3
    .scaleTime()
    .domain(d3.extent(state.data, d => d.year))
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleLinear()
    .domain([0, d3.max(state.data, d => d.population)])
    .range([height - margin.bottom, margin.top]);

  lineFunc = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.population));

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  
  let filteredData = [];
  if (state.selection !== null) {
    filteredData = state.data.filter(d => d.country === state.selection);
  }
  // console.log(state.selection, lineFunc(filteredData))
  const line = svg.selectAll("path.trend")
    .data([filteredData])
    .join(enter => 
      enter
        .append("path")
        .attr("class", "trend")
        .attr("opacity", 0)
        .call(sel => sel
          .transition()
          .duration(1000)
          .attr("opacity", 1)
          .attr("d", d => lineFunc(d))),
      update => update
        .call(sel => sel
        .transition()
        .duration(1000)
        .attr("d", d => lineFunc(d))),
      exit => exit.remove()
    )

}
