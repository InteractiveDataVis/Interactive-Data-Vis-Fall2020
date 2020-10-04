const width = window.innerWidth * 0.7
const height = window.innerHeight * 0.7

d3.csv("../data/populationOverTime.csv", d => ({
  year: new Date(d.Year, 0, 1),
  country: d.Entity,
  population: +d.Population,
})).then(data => {
  // console.log("data", data);
  
  const svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  const usaData = data.filter(d => d.country === "United States")
  console.log(usaData)

  const xScale = d3.scaleLinear()
    .domain(d3.extent(usaData, d => d.year))
    .range([0, width])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(usaData, d => d.population)])
    .range([height, 0])

  const lineFunc = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.population))

  /* this code block has the same function as below, just using append. Watch video for more info */
  // const line = svg.append("path")
  //   .attr("class", "trend")
  //   .attr("d", lineFunc(usaData))

  const line = svg.selectAll("path.trend")
    .data([usaData])
    .join("path")
    .attr("class", "trend")
    .attr("d", d => lineFunc(d))

});