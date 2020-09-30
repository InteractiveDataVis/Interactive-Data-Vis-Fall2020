var tabulate = function (data,columns) {
    var table = d3.select('body').append('table').attr("class", "imagetable")
      var thead = table.append('thead')
      var tbody = table.append('tbody')
    thead.append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(function (d) { return d })
    
      var rows = tbody.selectAll('tr')
          .data(data)
          .enter()
          .append('tr')
  
      var cells = rows.selectAll('td')
          .data(function(row) {
              return columns.map(function (column) {
                  return { column: column, value: row[column] }
            })
        })
      .enter()
      .append('td')
      .text(function (d) { return d.value })  
    return table;
  }
  // Wait until the DOM is loaded
  window.addEventListener("DOMContentLoaded", function(){
  
  d3.csv("fertility.csv").then(function(data) {
    console.log(data);
    //var columns = ['ID',	'Country',	'psat_cr',	'psat_m',	'psat_w','psat_tot',	'igcse_lit'	,'igcse_fle','Igcse_m']
    var columns = ['country',	'year',	'fertility_rate']
          tabulate(data,columns)
         // Get all the td elements in an array
  var theCells = document.getElementsByTagName("td");
  // Loop through each td
  for(var i = 0; i < theCells.length; ++i){
     // Set up a click event handler for the td
    // theCells[i].addEventListener("click", function(){
       if (theCells[i].innerText>6 && theCells[i].innerText<8 ){
       // Check to see if the td has the class attribute applied already
       if(theCells[i].getAttribute("class") === "highlight"){
         // If so, remove it
         theCells[i].removeAttribute("class");
       } else {
         // If not, add it
        // theCells[i].setAttribute("class", "highlight"); 
      theCells[i].setAttribute("class", "highlight");     
       }
      };
  }           
  });
  });
  var table = document.getElementsByTagName("table"), avgVal, sumVal = 0, 
     rowCount = table.rows.length - 1;// minus the header
              
    for(var i = 1; i < table.rows.length; i++){
       sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
    }
    document.getElementById("val").innerHTML = "Average Value = " + parseInt(sumVal / rowCount);