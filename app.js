let express = require(`express`);
let path = require("path");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/v1', (req, res)=> {
  res.render('v1');
});

app.post("/v1", (req, res)=> {

  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  let result = computeResult();

  function computeResult() {
    
    let result = [];

    for (let letter = 0; letter < 7; letter++) {
      if (guess[letter] === secretWord[letter]) {
        answer = 'correct';
      }
      else if (secretWord.includes(guess[letter])){
        answer = 'misplaced';
      }
      else {
        answer = 'incorrect';
      }
      result.push({letter: guess[letter], status: answer});
    }
    return result;
  }

  console.log(result);

  // return the guess
  res.render('v1', {result: result} ) ;

});

app.get('/v2', (req, res)=> {
  res.render('v2');
});

app.post("/v2", (req, res)=> {

  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();
  let results = []
  let result1 = computeResult();

  function computeResult() {
    
    let result1 = [];

    for (let letter = 0; letter < 7; letter++) {
      if (guess[letter] === secretWord[letter]) {
        answer = 'correct';
      }
      else if (secretWord.includes(guess[letter])){
        answer = 'misplaced';
      }
      else {
        answer = 'incorrect';
      }
      result1.push({letter: guess[letter], status: answer});
    }
    results.push(result1);
    return result1;
  }
  console.log(results);

  // return the guess
  res.render('v2', { results : results} ) ;

});


const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});
