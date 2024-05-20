const min = 1;
const max = 20;
const sampleSize = 10000;

function getRandomNumber() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const numbers = {};
for (let i = 0; i < sampleSize; i++) {
  const num = getRandomNumber();
  numbers[num] = (numbers[num] || 0) + 1;
}
console.log(numbers);