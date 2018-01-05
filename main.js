const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//creates 404 error message to send back to client when page does not exist
const error404Message = "<h1 style=" + "border-bottom: 2px solid black"+ ">404 ERROR</h1><h3>Page not found!</h3><p>Sorry the requested URL does not exist.  Please check your URL or return to the home page.</p>";

//creates img tag
const renderImage = (imageUrl) => {
  return "<img src=" + imageUrl + ">";
}

const comedians = [
  {id: 1, name: "Robin Williams"},
  {id: 2, name: "Jerry Seinfeld"},
  {id: 3, name: "Chris Rock"}
]

app.get('/comedians/:id', (request, response) => {
  for (let i = 0; i < comedians.length; i++) {
    let comedianName = comedians[i].name.toLowerCase().split(' ').join('');
    if (Number(comedians[i].id) === Number(request.params.id) || comedianName === (request.params.id).toLowerCase()) {
      return response.send(comedians[i]);
    }
  }
  return response.send(error404Message);
});

const pianoChords = [
  {id: 1, name: "C Major", triadNotes: ["c","e","g"], imageUrl: "https://i.imgur.com/hNKfOlb.png"},
  {id: 2, name: "D Major", triadNotes: ["d","f#","a"], imageUrl: "https://i.imgur.com/LHRyfyC.png"},
  {id: 3, name: "E Major", triadNotes: ["e","g#","b"], imageUrl: "https://i.imgur.com/JgUcq4s.png"},
  {id: 4, name: "F Major", triadNotes: ["f","a","c"], imageUrl: "https://i.imgur.com/m6xKPgf.png"},
  {id: 5, name: "G Major", triadNotes: ["g","b","d"], imageUrl: "https://i.imgur.com/h6i2a9b.png"},
  {id: 6, name: "A Major", triadNotes: ["a","c#","e"], imageUrl: "https://i.imgur.com/rMznaNI.png"},
  {id: 7, name: "B Major", triadNotes: ["b","d#","f#"], imageUrl: "https://i.imgur.com/0DaBniH.png"}
]

app.get('/piano-chords', (request, response) => {
  response.send(pianoChords);
})

app.get('/piano-chords/:id', (request, response) => {
  for (let i = 0; i < pianoChords.length; i++) {
    //creates a lowercase single word string version of the pianoChord name
    let chordName = pianoChords[i].name.toLowerCase().split(' ').join('');
    if (Number(pianoChords[i].id) === Number(request.params.id) || chordName === (request.params.id).toLowerCase()) {
      return response.send(pianoChords[i]);
    }
  }
  return response.send(error404Message);
})

app.get('/piano-chords/:id/image', (request, response) => {
  for (let i = 0; i < pianoChords.length; i++) {
    let chordName = pianoChords[i].name.toLowerCase().split(' ').join('');
    if (Number(pianoChords[i].id) === Number(request.params.id) || chordName === (request.params.id).toLowerCase()) {
      return response.send(renderImage(pianoChords[i].imageUrl));
    }
  }
  return response.send(error404Message);
})


app.listen(3000, () => {
    console.log("I am listening");
});
