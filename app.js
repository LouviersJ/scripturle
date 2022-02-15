let express = require("express");
let path = require("path");
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

  let result = computeResult(guess, secretWord);

  function computeResult(guess, secretWord) {
    let result = []
    let tempWord = secretWord;
    for (let i = 0; i < 7; i++) {
      if (guess[i] == tempWord[i]) {
        result.push({ letter: guess[i],
                      state: 'correct'})
        tempWord = setCharAt(tempWord,i,'-');
      }
      else {
        if(tempWord.includes(guess[i])) {
          let proc = true
          for (let e = 0; e < 7; e++) {
            if (guess[i] == tempWord[e] && proc) {
              if(guess[e] != tempWord[e]) {
                result.push({ letter: guess[i],
                              state: 'misplaced'})
                              tempWord = setCharAt(tempWord,e,'-');
                proc = false;
              }
            }
          }
          if (proc) {
            result.push({ letter: guess[i],
                          state: 'incorrect'})
          }


        }
        else {
          result.push({ letter: guess[i],
                        state: 'incorrect'})
        }
      }
    }
    return result;
  }
  function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

   


  // if(guess === secretWord) {
  //   // result = ['correct', 'correct', 'correct','correct','correct','correct','correct'];
  //   result = [
  //     {
  //       letter: guess[0],
  //       state: 'correct'
  //     },
  //     {
  //       letter: guess[1],
  //       state: 'correct'
  //     },
  //     {
  //       letter: guess[2],
  //       state: 'correct'
  //     },
  //     {
  //       letter: guess[3],
  //       state: 'correct'
  //     },
  //     {
  //       letter: guess[4],
  //       state: 'correct'
  //     },
  //     {
  //       letter: guess[5],
  //       state: 'correct'
  //     },
  //     {
  //       letter: guess[6],
  //       state: 'correct'
  //     }
  //   ]
  // }
  // else {
  //   result = [
  //     {
  //       letter: guess[0],
  //       state: 'correct'
  //     },
  //     {
  //       letter: guess[1],
  //       state: 'incorrect'
  //     },
  //     {
  //       letter: guess[2],
  //       state: 'incorrect'
  //     },
  //     {
  //       letter: guess[3],
  //       state: 'incorrect'
  //     },
  //     {
  //       letter: guess[4],
  //       state: 'incorrect'
  //     },
  //     {
  //       letter: guess[5],
  //       state: 'correct'
  //     },
  //     {
  //       letter: guess[6],
  //       state: 'correct'
  //     }
  //   ]
  // }
  

  console.log(result);

  // return the guess
  res.render('v1', {result: result} ) ;

});


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


app.post('/example', (req,res) => {

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
