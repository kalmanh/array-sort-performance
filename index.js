const randomWords = require('random-words');
const Benchmark = require('benchmark');

// Change this number to increase/decrease number of elements to sort
const NUMBER_OF_ELEMENTS = 1000000;
const PERCENT_DUPLICATES = 50;

const numberOfDuplicates = Math.floor(NUMBER_OF_ELEMENTS * PERCENT_DUPLICATES / 100);

const origArr = randomWords(NUMBER_OF_ELEMENTS);
const dupsArr = origArr.slice(0, numberOfDuplicates);

const finalArr1 = origArr.concat(dupsArr);
const finalArr2 = Array.from(finalArr1);

var suite = new Benchmark.Suite;

// add tests
suite
.add(`Sort WITHOUT 'checking for equal condition' for ${finalArr1.length} elements with at least ${numberOfDuplicates} duplicates`, function() {
    const alpha = finalArr1.sort((lastOne, nextOne) => {
        return lastOne > nextOne ? 1 : -1;
    });
})
.add(`Sort WITH 'checking for equal condition' for ${finalArr2.length} elements with at least ${numberOfDuplicates} duplicates`, function() {
    const alpha = finalArr2.sort((lastOne, nextOne) => {
        return lastOne > nextOne ? 1 : (nextOne > lastOne ? -1 : 0);
    });
})
.on('complete', function() {
  console.log(this["0"]["name"]);
  console.log(JSON.stringify(this["0"].times, null, 2));
  console.log(this["1"]["name"]);
  console.log(JSON.stringify(this["1"].times, null, 2));

  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });