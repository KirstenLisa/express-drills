const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hellö Express!');
  });
  
app.get('/burgers', (req, res) => {
      res.send('We have juicy cheese burgers!');
    })

  // DRILL 1

app.get('/sum', (req, res) => {
    const {a, b} = req.query;

  //2. validate the values
  if(!a) {
    return res
    .status(400)
    .send('Please provide a number');
  }

  if(!b) {
    return res
    .status(400)
    .send('Please provide a number');
  }
  //3. and 4. both numbers are valid so do the processing.
  const numA = parseInt(a);
  const numB = parseInt(b);
  const c = numA + numB;
  
  const sum = `The sum of ${numA} and ${numB} is ${c}.`;
  
  //5. send the response 
  res.send(sum);
  });

  // DRILL 2

  app.get('/cipher', (req, res) => {
    const {text, shift} = req.query;

    if(!text) {
      return res
      .status(400)
      .send('Please provide a text');
    }
  
    if(!shift) {
      return res
      .status(400)
      .send('Please provide a number');
    }

    const numShift = parseFloat(shift);

    if(Number.isNaN(numShift)) {
      return res.status(400).send('shift must be a number');
  }

    const start = 'A'.charCodeAt(0);

    const cipher = text.toUpperCase().split('').map(char => {
        const code = char.charCodeAt(0);

        if(code < start || code > (start + 26)) {
            return char;
        }

        let change = code - start;
        change = change + numShift;
        change = change % 26;

        const shiftedChar = String.fromCharCode(start + change);
        return shiftedChar;
    })
    .join('');

    res.status(200).send(cipher);
});


// Drill 3

app.get('/lotto', (req, res) => {
  const {arr} = req.query;
  

  if(!arr) {
      return res.status(400).send('arr is required!');
  } 

  if(!Array.isArray(arr)) {
      return res.status(400).send('numbers must be an array');
  }

  const guesses = arr.map(n => parseInt(n)).filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

  if(guesses.length != 6) {
      return res.status(400).send("arr must contain 6 numbers");
  }

  const lottoNums = [];

  for (let i = 0; i < 6; i ++) {
      lottoNums.push(Math.floor(Math.random() * 20));
  }

  const results = [];

  function intersect(guesses, lottoNums) {
      var d1 = {};
      var d2 = {};
      
      for (var i = 0; i < guesses.length; i++) {
          d1[guesses[i]] = true;
      }
      for (var j = 0; j < lottoNums.length; j++) {
          d2[lottoNums[j]] = true;
      }
      for (var k in d1) {
          if (d2[k]) 
              results.push(k);
      }
      return results;
  }

  switch(true) {
      case results.length < 4:
          return res.status(200).send('Sorry, you lose!');
      case results.length === 4:
          return res.status(200).send('Congratulations, you win a free ticket');
      case results.length === 5:
          return res.status(200).send('Congratulations! You win $100!');
      case results.length === 6:
          return res.status(200).send('Wow! Unbelievable! You could have won the mega millions!');
  }
});




  app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });

