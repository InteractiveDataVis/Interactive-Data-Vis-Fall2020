/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5;

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg;
let xScale;
let yScale;

/**
 * APPLICATION STATE
 * */
let state = {
  data: [],
  selectedParty: "All",
};
//t  initiate transition for all
//ease-in-out - specifies a transition effect with a slow start and end 
// i wanted to use easein out but it did not work 
const t = d3.transition().duration(1000).ease(d3.easeLinear);
;

/**
 * LOAD DATA
 * */
d3.csv("fertility.csv", d3.autoType).then(raw_data => {
  console.log("raw_data", raw_data);
  state.data = raw_data;
  init();
});

/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
function init() {
  // SCALES
  xScale = d3
    .scaleLinear()
    .domain(d3.extent(state.data, d => d.year))
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleLinear()
    .domain(d3.extent(state.data, d => d.fertility_rate))
    .range([height - margin.bottom, margin.top]);

  // AXES
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // UI ELEMENT SETUP
  // add dropdown (HTML selection) for interaction
  // HTML select reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("new country is", this.value);
    // `this` === the selectElement
    // this.value holds the dropdown value a user just selected
    state.selectedParty = this.value;
    draw(); // re-draw the graph based on this new selection
  });

  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")
    .data(["All", "United States", "Spain"]) // unique data values-- (hint: to do this programmatically take a look `Sets`)
    .join("option")
    .attr("value", d => d)
    .text(d => d);

  // create an svg element in our main `d3-container` element
  svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // add the xAxis
  svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Year");

  // add the yAxis
  svg
    .append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(${margin.left},0)`) // to return 
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%")
    .attr("dx", "-3em")
    .attr("writing-mode", "vertical-rl")
    .text("Fertility Rating");

  draw(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  // filter the data for the selectedParty
  let filteredData = state.data;
  // if there is a selectedParty, filter the data before mapping it to our elements
  if (state.selectedParty !== "All") {
    filteredData = state.data.filter(d => d.country === state.selectedParty);
  }

  const dot = svg
    .selectAll(".dot")
    .data(filteredData, d => d.country) // use `d.country` as the `key` to match between HTML and data elements
    .join(
      enter =>
        // enter selections -- all data elements that don't have a `.dot` element attached to them yet
        enter
          .append("circle")
          .attr("class", "dot") 
          .attr("id","testclick")// Note: this is important so we can identify it in future updates
          .attr("stroke", "orange")
          .attr("opacity", 0.5)
          .attr("fill", d => {
            if (d.country === "United States") return "yellow";
            else (d.country === "Spain")
            return "purple";
           
          })
         
          .attr("r", radius*1.5)
          //.attr("cy", d => margin.top)
         // .attr(["cy", d3.max(state.data, d => d.fertility_rate)])
          .attr("cy", d => yScale(d.fertility_rate))
           .attr('cx', function(d, i) {
            return i * 200;
          })
          .attr("cx", d => margin.right) 
           .attr("cy",  - margin.top)
          
         
        //  .attr("cx", d => margin.right) // to return 
           // initial value - to be transitione
          .call(enter => // we work on enter because we want to animate the element when first , they enter in the page
            enter
            .transition(t) // initialize transition
            //.ease(d3.easein)
            .delay(d => 500* d.fertility_rate) // delay on each element
               // duration 500ms
              //.attr("cy", d => yScale(d.fertility_rate))
              .attr("cx", d => margin.right) 
              .attr('cx', function(d, i) {
                return i * 200;
              })
              .attr("cx", d => xScale(d.year))
              .attr("cy", d => yScale(d.fertility_rate))
             // .attr(["cy", d3.max(state.data, d => d.fertility_rate)])
             
          ),
      update =>
        update.call(update =>
          // update selections -- all data elements that match with a `.dot` element
          
          update
          .data(filteredData, d => d.country) // had to add this since my data did not show up on github because of 
                                               // error already late // need more explanation why we have to set the data again
            .transition(t) // duration is decalre in the beginning
            .attr("r", radius*2)
            .attr("stroke", "black")
            .attr("cx", d => margin.right) // how the dot will appear 
            .attr("cy",  - margin.top) // it will appear by the top  anf from the right to the left 
            //.data(filteredData, d => d.country)
            .transition(t)
            
            .attr("stroke", "lightgrey")
           .attr("cx", d => margin.right) 
           .attr('cx', function(d, i) {
            return i * 200;
          })
        ),
      exit =>
        exit.call(exit =>
          // exit selections -- all the `.dot` element that no longer match to HTML elements
          // when we select only the spain , the one of united state should be removed from the DOM , so the .dot will be modified 
          exit
            //.transition(t)
          //  .attr("r", radius*1.5)
            // .delay(d => 500 * d.fertility_rate) 
            //.duration(500)
            //.attr("cx", d => margin.right) 
           // .attr("cy",  - margin.top) // try to exit by the top 
           // .remove()
           //.data(filteredData, d => d.country) // has to add this since my data won t show up on github because of 
           .transition()
            .delay(d => 500 * d.fertility_rate)
            .duration(500)
            //.attr("cx", width)
            .attr("cx", d => margin.right) 
            .attr("cy",  d => margin.top)
            .remove()
  
        )
    );
}


