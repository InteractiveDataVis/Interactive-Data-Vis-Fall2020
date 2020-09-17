/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5;

let svg;
let xScale;
let yScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All"
};

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
  console.log("raw_data", raw_data);
  state.data = raw_data;
  console.log("state", state)
  init();
});

/* INITIALIZING FUNCTION */
function init() {

  const selectElement = d3.select("#dropdown").on("change", function() {
    state.selection = this.value
    console.log("new value is", this.value);
    console.log(state)
    draw();
  });

  selectElement
    .selectAll("option")
    .data(["All", "D", "R", "I"])
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width])

  yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])

  draw();
}

/* DRAW FUNCTION */
function draw() {

  let filteredData = state.data
  if (state.selection !== "All") {
    filteredData = state.data.filter(d => d.party === state.selection)
  }

  console.log(filteredData)

  const dot = svg.selectAll(".dot")
    .data(filteredData, d => d.name)
    .join(
      enter => enter
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d["ideology_rating"]))
      .attr("cy", d => yScale(d["environmental_rating"]))
      .attr("r", 10),
      update => update,
      exit => exit.remove()
    )

}
