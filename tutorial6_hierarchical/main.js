/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg;
let tooltip;

/**
 * APPLICATION STATE
 * */
let state = {
  data: null,
  hover: null,
  mousePosition: null,
};

/**
 * LOAD DATA
 * */
d3.json("../data/flare.json", d3.autotype).then(data => {
  state.data = data;
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  const container = d3.select("#d3-container").style("position", "relative");

  svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  tooltip = container
    .append("div")
    .attr("class", "tooltip")
    .attr("width", 100)
    .attr("height", 100)
    .style("position", "absolute");

  // + CREATE YOUR ROOT HIERARCHY NODE
  const root = d3.hierarchy(state.data)
    .sum(d => d.value)
    .sort((a,b) => b.value - a.value)

  // + CREATE YOUR LAYOUT GENERATOR
  const tree = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true)

  // + CALL YOUR LAYOUT FUNCTION ON YOUR ROOT DATA
  const treemap = tree(root)
  console.log(treemap)

  // + CREATE YOUR GRAPHICAL ELEMENTS
  console.log(treemap.leaves())
  const leaf = svg.selectAll(".leaf")
    .data(treemap.leaves())
    .join("g")
    .attr("class", "leaf")
    .attr("transform", d => `translate(${d.x0}, ${d.y0})`);

  leaf.append("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1- d.y0)
    .attr("x", 0)
    .attr("y", 0)
    .on("mouseover", d => {
      console.log("fired")
      state.hover = {
        name: d.data.name,
        value: d.data.value,
        x: d.x0,
        y: d.y0
      }
      draw();
    })

  leaf.append("text")
    .attr("x", 2)
    .attr("y", 2)
    .text(d => d.data.name)
    .style("fill", "white")
    .style("alignment-baseline", "hanging")


  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  // + UPDATE TOOLTIP
  if (state.hover) {
    tooltip
      .html(
        `
        <div>Name: ${state.hover.name}</div>
        <div>Value: ${state.hover.value}</div>
        `
      )
      .style("background-color", "pink")
      .style("transform", `translate(${state.hover.x}px,${state.hover.y}px)`)
  }
}
