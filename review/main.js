/**
 * Canvas example: https://observablehq.com/@mbostock/fullscreen-canvas
 * 
 * This code uses fake data to walk through enter / update / exit as well as transitions.
 * This should help you understand the positioning of your elements better as well. 
 */

/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.8,
  height = window.innerHeight * 0.8,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };
let svg;
let text;


/* APPLICATION STATE */
let state = {
  data: [],
  dataNumber: 0
};


/* LOAD DATA */
init()


/* INITIALIZING FUNCTION */
function init() {
  console.log("initing")
  
  text = d3.select("#d3-container")
    .append("div")

  svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  
  draw();
}

// some data update magic
function updateData() {
  const newDataNumber = (state.dataNumber + 1) % 3
  const dataOptions = [
    [{ name: "a", value: 50}, {name: 'b', value: 70}],
    [{ name: "a", value: 50}, {name: 'b', value:  80},{name: 'd', value:  90}, {name: 'e', value: 100}],
    [{ name: "a", value: 50}, {name: 'f', value: 130}, {name: 'g', value: 120}, {name: 'h', value: 130}]
  ]
  state = {
    data: dataOptions[newDataNumber],
    dataNumber: newDataNumber
  }
  draw()
}

/* DRAW FUNCTION */
function draw() {
  console.log("drawing with ", state.data)
  text.text(JSON.stringify(state.data))

  const circle = svg.selectAll('circle.dot')
    .data(state.data, d => d.name)
    // .join("circle")
    // .attr("cx", 0)
    // .attr("cy", 0)
    // .attr("r", 10)
    // .transition()
    //   .duration(500)
    //   .attr("cx", d => d.value)
    //   .attr("cy", d => d.value)
    .join(
      enter => enter
        .append("circle")
        .attr("class", "dot")
        .attr("cx", 500)
        .attr("cy", 0)
        .attr("r", 10)
        .call(sel => sel.transition()
          .duration(500)
          .attr("cx", d => d.value)
          .attr("cy", d => d.value)),
      update => update
        .call(sel => sel.style("fill", "pink"))
        .call(sel => sel.transition()
            .duration(500)
            .attr("cx", d => d.value)
            .attr("cy", d => d.value)),
      exit => exit
        .call(sel => sel
          .transition()
          .duration(500)
          .attr("r", 0)
          .remove()
        )
    )

}
