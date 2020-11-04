//function declaration 
function greet(){
    console.log('Hello there');
}
//function expression
const speak= function(){
    console.log('good day');
};

greet();
speak();
// function  declaration can declared even before it was initiate
greet1();

function greet1(){
    console.log('Hello there111');
}

// function  declaration can declared even before it was initiate
// function expression we can not call the function before declaring it 
//speak1();
const speak1= function(){
    console.log('good day');
};
// parameter and function
const speak2= function (name, time){
    console.log(`good day ${time} ${name}`);
};
// take value et set it in variable 
speak2("meriem","day");

const calcarea= function(radius){
    let area =3.14 *radius**2;
   // it is stored locally in the function 
   console.log('data area is',area);
   return area;
     // or we can do 
     //return 3.14 *radius**2;
};
// thats why we need to return a value return area, in order to use out of the funtion 
calcarea(0);
//console.log("out of the function "+area);
// it still not working that's why we need to retrn it in function
 const area1 = calcarea(5);
 console.log('data area1 is',area1);
 // arrow function is a shorter version of function
 // const calarea1= (radius)=>{
    //const calarea1= ()=>{
    const calarea1= radius=>{
      return 3.14 *radius**2;
  }
  //or
  const calarea2= radius=> 3.14 *radius**2; // take off wrod retrn 
  const area = calarea1(5);
  const area2 = calarea2(5);

  console.log('data arrow is', area);
  console.log('data arrow 2is', area2);