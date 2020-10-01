const selection = d3.select("#d3-container")
console.log(selection)

const svg = selection.append('svg')
console.log(svg)

const data = [0, 1, 2, 3]
const circle = svg.selectAll('circle')
  .data(data)
  .join("circle")
  .attr("cx", d => 20 + d*20)
  .attr("cy", d => 20 + d*20)
  .attr("r", 0)
  .attr("fill", "black")
  // .transition()
  // .duration(1000)
  // .attr("r", 10)
  .call(sel => sel
    .transition()
    .duration(1000)
    .attr("r", 10)
  )

circle.attr("fill", "pink")

console.log(circle)
