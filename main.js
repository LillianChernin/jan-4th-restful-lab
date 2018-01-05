const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const error404Message = "<h1 style=" + "border-bottom: 2px solid black"+ ">404 ERROR</h1><h3>Page not found!</h3><p>Sorry the requested URL does not exist.  Please check your URL or return to the home page.</p>";

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

app.listen(3000, () => {
    console.log("I am listening");
});
