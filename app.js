var knex = require('./db/knex.js')
var express = require('express');
var app = express();
var bodyparser = require('body-parser');


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

function puppies() {
  return knex('puppies');
}


app.get('/new', function(req, res) {
  puppies().select().then(function(data) {
      res.render('new', {puppies: data})
  })
})

app.get('/:id/edit', function(req, res) {
  var puppyId = req.params.id;
  puppies().where('id', puppyId).select().then(function(data) {
      console.log(data);
      res.render('edit', {puppy: data[0]})
  });
});

app.post('/:id/edit', function(req, res) {
  var puppyId = req.params.id;
  var pup = req.body;

  puppies().where('id', puppyId).first().update({
    name: pup.name,
    age: pup.age
  }).then(function(result) {
    res.redirect('/');
  });
})

app.get('/:id/delete', (req, res) => {
  var puppyId = req.params.id;
  puppies().where('id', puppyId).del().then(function(result) {
    res.redirect('/');
  });
});

app.get('/', function(req, res) {
  puppies().select().then(function(data) {
    res.render('index', {puppies: data})
  })
}) 

app.post('/', function(req, res) {
  var pup = req.body;
  puppies().insert({
    name: pup.name,
    age: pup.age
}).then(function(result) {
  res.redirect('/');
})
})


app.listen(8080, function() {
  console.log("I am listening on eighty eighty, yo!")
})
