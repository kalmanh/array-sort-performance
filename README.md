# Array#sort() musings

If you look at [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) documentation for sorting arrays in Javascript, you will see that you are able to specify a `compare` function to be used as follows

```javascript
function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  }
  if (a is greater than b by the ordering criterion) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

somearray.sort(compare); // somearray is now sorted...
```

Clearly, there are 3 conditions being checked for:

1. greater than
2. less than
3. equal to

Recently, I was taking an excellent (and FREE!) [Javascript course (javascript30.com)](https://javascript30.com) from [Wes Bos](http://wesbos.com/) and Wes showed off the following `compare` function that can sort last names alphabetically. (The actual function was a little more complicated, but I am concentrating on the actual sorting part of it.)

```javascript

function compare(lastName1, lastName2){
    return lastName1 > lastName2 ? 1 : -1;
}

const names = ["Doe", "Smith", "Doe", "Hazins", "Bos", "Bos"];
console.log(names.sort(compare)); // [ 'Bos', 'Bos', 'Doe', 'Doe', 'Hazins', 'Smith' ]
```

The function is using a ternary operator `(? :)` and clearly "works". But wait a second... It's missing the 0 check?! Shouldn't we have the 0 check? As in

```javascript

function compare(lastName1, lastName2){
    return lastName1 > lastName2 ? 1 : (lastName2 > lastName1 ? -1 : 0); // GREATER THAN, LESS THAN OR EQUAL!
}

const names = ["Doe", "Smith", "Doe", "Hazins", "Bos", "Bos"];
console.log(names.sort(compare)); // [ 'Bos', 'Bos', 'Doe', 'Doe', 'Hazins', 'Smith' ]
```

Ternary operator with 3 conditions. Ugly, I know, but at least from the documentation it sounds like it should be in there. But then again, it works without it. :)

I put together this repo to test the performance of both:

1. The 0 check **not** there
2. The 0 check there

It seems that when sorting large arrays that have large number of duplicates - it is better to have the 0 check in. Otherwise, it is better to leave the 0 check out. I believe the reason is because the "0 check" tells it not to touch the elements when they are equal and the less elements you have to touch (swap) - the better. But it **is** an extra check (a 3rd condition), so if there are not that many elements or not that many duplicates - it is actually **faster** without...

What do YOU think? :)

# How to run the code

1. Clone the repo
2. [Install Node.js](https://nodejs.org/en/)
3. `npm install`
3. `node --max-old-space-size=4096 index.js`
