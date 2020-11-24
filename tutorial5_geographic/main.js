
  // If you look closely, you can also see that the values associated with these properties are all strings. This is probably not what you want in the case of numbers. When loading CSVs and other flat files, you have to do the type conversion.

  // We will see more of this in other tasks, but a simple way to do this is to use the + operator (unary plus). forEach can be used to iterate over the data array.
   // with json no need to put + for numeric , no need conversion 
   
   
  
   const width = window.innerWidth * 0.8,
height = window.innerHeight * 0.8,
margin = { top: 20, bottom: 50, left: 60, right: 40 };

    let svg;
 // inisiate the object state 
        let state = {
            datageojson: null,
            dataheat: null,
            hover: { // hover is an object and it has two properties latitude and 
              latitude1: null,
              longitude1: null,
            },
          };
         
          
        //read in topojson
        /*d3.queue()
        .defer(d3.json,"usState.json")
        .await(ready)*/
        Promise.all([
            d3.json("usState.json"),d3.csv("statelatlong.csv"), // pull a new file in promises 
        ]).then( ([datageojson,dataheat])=>{ // it returns an object 
            state.datageojson = datageojson;
           state.dataheat= dataheat; //instead of data.object.countries.features
            console.log(" data state: ", state.datageojson.features);// 52 states it will return an array features :52 lines 
           console.log("data heat", state.dataheat);
            init();
        });
        
        function init() {
            svg=d3.select("#map")
            .append("svg")
            .attr("height",height  )
            .attr("width",width)
           // .append("g")
        //.attr("transform","translate(" + margin.left + "," + margin.top+ ")");
// projection since our world is round we need it to project it into screen 
//var projection =d3.geoMercator()
//.scale(80)
//.fitSize([width, height], state.datageojson)
//.translate([width , height ])
//.center([100, -50]);
const projection = d3.geoAlbersUsa()
  .fitSize([width, height], state.datageojson)
//.fitSize([width,  ,height], state.datageojson)
//.scale(150)
   // .scale(300)
// shape is build on different type , we need to precise 
var path=d3.geoPath()
.projection(projection)
       //create the element 
        svg.selectAll(".state")
           .data(state.datageojson.features)
           .enter().append("path")
           .attr("class","state")
          .attr("d",path) // this path came from projection that we set 
          //.on('click' ,function(d){// or we can use mouseover
          .on('mouseover',function(d){
              console.log(d)
            // d3.select(this).atrr("fill","yellow")// overriden by css
            // add class selected 
              d3.select(this).classed("selected",true)// add the cllas of selected  to the elemenent hase been clicked
          })
          .on('mouseout',function(d){
            console.log(d)
          // d3.select(this).atrr("fill","yellow")// overriden by css
            d3.select(this).classed("selected",false)// add the cllas of selected  to the elemenent hase been clicked
        })
         // .attr("fill","#cccccc") 
         // adding colors to the different path in css
svg.selectAll(".city-circle")
.data(state.dataheat)
.enter().append("circle")
.attr("r",2)
.attr("fill", "#EE2677")
.attr("cx",function (d){
    var coords = projection([d.Longitude,d.Latitude])
   console.log(coords)
    // x is 0 we need only latitude
    return coords[0];
})
.attr("cy", function(d){
    var coords = projection([d.Longitude,d.Latitude])
    // x is 0 we need only latitude
    //console.log(coords)
   return coords[1];
})
    //  .on('click' ,function(d){// or we can use mouseover
         .on('mouseover',function(d){
            console.log(d)
          // d3.select(this).atrr("fill","yellow")// overriden by css
          // add class selected 
            d3.select(this).classed("selected1",true)// add the cllas of selected  to the elemenent hase been clicked
        })
        

svg.selectAll(".state_label")
.data(state.dataheat)
.enter().append("text")
.attr("class","state_label")
.attr("x",function (d){
    var coords = projection([d.Longitude,d.Latitude])
   console.log(coords)
    // x is 0 we need only latitude
    return coords[0];
})
.attr("y", function(d){
    var coords = projection([d.Longitude,d.Latitude])
    // x is 0 we need only latitude
    //console.log(coords)
   return coords[1];
})
.on('mouseover',function(d){
    console.log(d)
  // d3.select(this).atrr("fill","yellow")// overriden by css
  // add class selected 
    d3.select(this).classed("selected2",true)// add the cllas of selected  to the elemenent hase been clicked
})
.on('mouseout',function(d){
  console.log(d)
// d3.select(this).atrr("fill","yellow")// overriden by css
  d3.select(this).classed("selected2",false)// add the cllas of selected  to the elemenent hase been clicked
})
.text(function(d){
    return d.City
})
.attr("dx",5)
.attr("dy",6)
          
        
        }
