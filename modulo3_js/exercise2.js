const elements = ["lorem", "ipsum", "dolor", "sit", "amet"];
const index = 2;
const newValue = "furor";

const replaceAt = (arr, index, newElement) => {
  const cutInitialPartArray = arr.slice(0, index);
  const cutFinalPartArray = arr.slice(index+1, elements.length)
  const newArray = [...cutInitialPartArray, newElement, ...cutFinalPartArray]
  return newArray
};

const result = replaceAt(elements, index, newValue);
console.log(result === elements); // false
console.log(result); // ['lorem', 'ipsum', 'furor', 'sit', 'amet'];