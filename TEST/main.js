d3.csv("PSAT_IGCSE_Scores_01.csv").then(function(data) {
    console.log(data); 
  });

console.log("data")
console.log('PINK is my favorite color')
// call back function
 let people  = ['Meriem','Asma'];
 people.forEach(data=>{ // take a value for each data as a parameter  or foreach((data).......
   console.log (data);
 });
// OR WE CAN SPECIFY THE INDEX 


 people.forEach((index,data)=>{ // take a value for each data as a parameter  or foreach((data).......
  console.log (index,data);
 });
 // or  we can create an arrow function and pass this into paramater 
 const callback = (index,data)=>{
   console.log('${index} - hello- ${data}');
 };
 people.forEach(callback);
 // an ibject is between{}
 let user ={
   name:'crystal',
   age:30,
   bolg:['hello','me']// this is array 
 };
 const key = Object.keys(user);
 const value= Object.values(user);
 const entries = Object.entries(user);
 console.log(key);
 console.log(value);
 console.log(entries);
 console.log(user);
 console.log(user.age);
 //console.log(user['name']); it suppose de work
 //user['name']='Ferhat';
// console.loge(user['name']);
//topojson can be converted to something called a “mesh”,which is just one large web of paths. Since it is just one path,
//we use datum to append the mesh to the svg.geojson allows us to iterate over.each feature (state, county,
//country, etc.), so we can use our usual .data().join() process.
//specify path drawing
const topoPath= d3.geoPath()
    .projection(null);
// append a single path element to all us 
svg.append("path")
   .datum(topojson.mesh(mapFile))// “mesh”,which is just one large web of paths
   .attr ("d",topoPath);
   // geojson isn't already projected
   const geoPath=d3.geoPath()
      .projection(d3.geoAllbersUSA())

  
   //join one path by country 
   var paths=svg.selectAll("path")
   .data(geojson.features)
   .join('path')
   .attr("class","border border--state")
   .attr(d,)