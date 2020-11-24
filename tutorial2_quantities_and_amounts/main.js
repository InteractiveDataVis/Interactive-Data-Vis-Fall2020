d3.csv("../data/fertility1.csv").then(data=> {
  console.log(data);
  console.log( data.map(d=>d.year))

  var margin = {top: 20, right: 30, bottom: 40, left: 90},
  svgWidht=1000- margin.left - margin.right,
  svgHeight=2500- margin.top - margin.bottom;

  const svg =d3.select('#my-svg')
  .append("svg")
  .attr("width", svgWidht + margin.left + margin.right)
  .attr("height", svgHeight + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

const xScale = d3.scaleLinear()
.domain([0, d3.max(data.map(d => d.fertility_rate))])
.range([0, svgWidht])
svg.append("g")
.attr("transform", "translate(0," + svgHeight + ")")
.call(d3.axisBottom(xScale))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");

var color = d3.scaleOrdinal(d3.schemeCategory20) 

const yscale =d3.scaleBand()
.domain(data.map(d=>d.year))
.range([svgHeight,0])// to make a scale banc on xscale 
.padding(.1)
svg.append("g")
.call(d3.axisLeft(yscale));


// build a bar 
const bars = svg.selectAll("rect.bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x",d=> xScale(0)) // it related to the bar and when it starts 
.attr("y",d=>yscale(d.year))// so x and y are the axis 
.attr("width",d=> xScale(d.fertility_rate))
.attr("height",d=> yscale.bandwidth())
.attr("fill", function(d, i) { return color(i); })
//.style("fill","pink")
//text labels on bars

svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
.text(function(d) {
     for(var i = 0; i < data.length; i++){
         return d[i].key;
     }

})
.attr("text-anchor", "middle")
.attr("x", function(d, i) {
     return i * (w / data.length) + (w / data.length - barPadding) / 2;
})
.attr("y", function(d) {
     return h - (d * 4) + 14;
})
.attr("font-family", "sans-serif")
.attr("font-size", "11px")
.attr("fill", "white");

  //add a value label to the right of each bar
  
  })

  
//const Yscale=d3.scaleLinear()
//.domain()
//.range()
