const express = require("express");
const path = require("path");
const bodyParser = require("body-paresr");
const cons = require("consolidate");
const dust = require("dustjs-helpers");
const pg = require('pg')

const app = express();

// const connectionString = "postgres://olumide:lumidizzle31@localhost/recipebookdb";
const config = {
  user: 'olumide',
  database: 'recipebookdb',
  password: 'lumidizzle31',
  port: 5432
};

const pool = new pg.Pool(config);

//Assign Dust engine to .dust files
app.engine("dust", cons.dust);

//Set default ext .dust
app.set("view engine", "dust");
app.set("views", __dirname + "/views");

//Set public folder
app.use(express.static(path.join(__dirname, "public")));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routing
app.get('/', (req, res, next) => {
  pool.connect(function (err, client, done) {
      if (err) {
          console.log("Can not connect to the DB" + err);
      }
      client.query('SELECT * FROM recipes', function (err, result) {
        if (err) {
          // console.log(err);
          return res.status(400).send(err);
        }
        // console.log(result)
        return res.render('index', {recipes: result.rows });
        done();
      })
  })
});

app.post('/add', (req, res) => {
  pool.connect(function (err, client, done) {
    if (err) {
        console.log("Cannot connect to the DB" + err);
    }
     client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', [req.body.name, req.body.ingredients, req.body.directions])

     done();
     res.redirect('/')
})
})

app.delete('/delete/:id', (req, res) => {
  pool.connect(function (err, client, done) {
    if (err) {
        console.log("Cannot connect to the DB" + err);
    }
     client.query('DELETE FROM recipes WHERE id = $1', [req.params.id])

     done();
     res.sendStatus(200)
  })
})

app.post('/edit', (req, res) => {
  pool.connect(function (err, client, done) {
    if (err) {
        console.log("Cannot connect to the DB" + err);
    }
     client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id = $4', [req.body.name, req.body.ingredients, req.body.directions, req.body.id])

     done();
     res.redirect('/')
})
})

//Server
app.listen(3000, function() {
  console.log("Server stated on port 3000");
});
