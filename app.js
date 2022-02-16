let express = require("express");
let path = require("path");
let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get("/v1", (req, res) => {
  res.render("v1");
});

app.post("/v1", (req, res) => {
  let secretWord = "HEBREWS".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  let result = computeResult(guess, secretWord);

  console.log(result);

  // return the guess
  res.render("v1", {result:result});
});

function computeResult(guess, secretWord) {
  let result = [];

  for (i = 0; i < 7; i++) {
    if (guess[i] == secretWord[i]) {
      result.push({letter:guess[i], state:"correct"});
    } else if (secretWord.includes(guess[i])) {
      result.push({letter:guess[i], state:"misplaced"});
    } else {
      result.push({letter:guess[i], state:"incorrect"});
    }
  }

  return result;
}

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

app.post("/example", (req, res) => {
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

const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});
