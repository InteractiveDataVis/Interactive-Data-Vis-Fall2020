d3.csv("../data/surveyResults.csv").then(data => {

  console.log(data)

  const table = d3.select("#d3-table");

  const body = table.append('tbody').attr("id", "2")

  // d3.select("d3-table")
  //   .append("tbody")
  //   .append("tr")

  const rows = body.selectAll(".row")
    .data(data)
    .join('tr')
    .attr('class', 'row')

  const cells = rows
    .append("td")
    .text(d => d["Timestamp"])

})

