const elements = [0, 1, false, 2, "", 3];

const compact = (arg) => {
  if (arg && arg.constructor.name === "Array") {
    return arg.filter(Boolean)
  } 

  if (arg && arg.constructor.name === "Object"){
    const filteredObject = Object.entries(arg).filter(([key, value]) => {
      if(value){
        return [key, value]
      }
    })
    return Object.fromEntries(filteredObject);
  } 
  
  return arg
};

console.log(compact(123)); // 123
console.log(compact(null)); // null
console.log(compact([0, 1, false, 2, "", 3])); // [1, 2, 3]
console.log(compact({})); // {}
console.log(compact({ price: 0, name: "cloud", altitude: NaN, taste: undefined, isAlive: false })); // {name: "cloud"}