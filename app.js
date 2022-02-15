let express = require("express");
let path = require("path");
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//#region /v1
app.get('/v1', (req, res) => {
  res.render('v1');
});

app.post("/v1", (req, res) => {

  let secretWord = "HEBREWS".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  let result = getResult(secretWord, guess);

  console.log(result);

  // return the guess
  res.render('v1', { result: result });

});
//#endregion

//#region /v2
app.get('/v2', (req, res) => {
  res.render('v2');
});

app.post("/v2", (req, res) => {

  let secretWord = "HEBREWS".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  let result = getResult(secretWord, guess);

  console.log(result);

  // return the guess
  res.render('v2', { result: result });

});
//#endregion

//#region Example
/* EXAMPLE */

let mark = { first: "Mark", last: "Hamill", age: "70" };

app.get("/example/:age", (req, res) => {
  let ageSentence = "";
  const age = parseInt(req.params.age);

  if (age > mark.age) {
    ageSentence = "You're older than Mark Hamill!";
  } else if (age < mark.age) {
    ageSentence = "You're younger than Mark Hamill!";
  } else {
    ageSentence = "You are Mark Hamill!";
  }
  const page = `<html>
                    <head> </head>
                    <body> 
                      <h1> Example </h1>
                      <p> ${ageSentence} </p>
                    </body>
                </html>`;

  //res.render('index', ageSentence);

  res.send(page);
});


app.post('/example', (req, res) => {

  let age = req.body.age;

  if (age > mark.age) {
    ageSentence = "You're older than Mark Hamill!";
  } else if (age < mark.age) {
    ageSentence = "You're younger than Mark Hamill!";
  } else {
    ageSentence = "You are Mark Hamill!";
  }
  const page = `<html>
                    <head> </head>
                    <body> 
                      <h1> Example </h1>
                      <p> ${ageSentence} </p>
                    </body>
                </html>`;

  //res.render('index', ageSentence);

  res.send(page);

});
//#endregion

app.get('/', (req, res) => {
  res.send(`<a href="http://${hostname}:${port}/v1">scripturle v1</a>
  <br>
  <a href="http://${hostname}:${port}/v2">scripturle v2</a>`);
});

const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});


function getResult(secretWord, guess) {
  let resultArray = [];
  let secretCopy = secretWord;

  // check for correct
  for (let i = 0; i < secretWord.length; i++) {
    if (guess[i] === secretWord[i]) {
      // resultArray[i] = "correct";
      // secretCopy = secretCopy.replace(guess[i], "");
      resultArray[i] = { letter: guess[i], value: "correct" };
      secretCopy = secretCopy.replace(guess[i], "");
    }
  }

  // check for misplaced
  for (let i = 0; i < secretWord.length; i++) {
    if (secretCopy.includes(guess[i])) {
      // resultArray[i] = "misplaced";
      // secretCopy = secretCopy.replace(guess[i], "");
      resultArray[i] = { letter: guess[i], value: "misplaced" };
      secretCopy = secretCopy.replace(guess[i], "");
    }
  }

  // fill in rest of array with incorrect
  for (let i = 0; i < secretWord.length; i++) {
    if (resultArray[i] === undefined) {
      // resultArray[i] = "incorrect";
      resultArray[i] = { letter: guess[i], value: "incorrect" };
    }
  }

  // convert result array to object with key/value pairs, "A": "correct"
  // let result = {};
  // for (let i = 0; i < guess.length; i++) {
  //   result[guess[i]] = resultArray[i];
  // }

  console.log(resultArray);
  return resultArray;
}