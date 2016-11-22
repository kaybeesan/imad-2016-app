//module P11
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var config = {
    user: 'kaybeesan',
    database: 'kaybeesan',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
//creating a hash
var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
return ['pbkdf2','10000', salt, hashed.toString('hex')].join('$');
} 

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');    
    res.send(hashedString);
});

app.post('/create-user', function(req,res){
    //user name,password
    //json
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username,dbString],function(err,result){
           if (err) {
            res.status(500),send(err.toString());
        } else {
            res.send('username successfully created : '+ username);
        }
    });
});



function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
<html>
    <head>
        <title>
            ${title} 
        </title>
    <meta name="viexport" content="width=device-width, initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class= "container">
        <div>
            <a href = "/"> Home</a>
        </div>
        <hr>
        <h1>
            ${heading}
            <div>
                ${date.toDateString()}
            </div>
        </h1>
        <div>
      ${content}
       </div>
       <hr>
  <input type = 'text' id = 'comment' size = '50' placeholder = 'Your Comments here!!'> </input>
       <input type = 'submit' id = 'comment_btn' value = 'submitcomment'> 
       <ul id = 'commentlist'></input>
       </ul> 
       </div> 
       <script type="text/javascript" src="/ui/main.js">
       </script>  
    </body>
 
</html>`
;

return htmlTemplate;

}
var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    //make a select request
    //return a response with results
    pool.query('SELECT * FROM test', function (err,result){
        if (err) {
            res.status(500),send(err.toString());
        }
        else { res.send(JSON.stringify(result.rows));
        }
    });
});


var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1; 
  res.send(counter.toString());

});

var names = [];
app.get('/submit-name', function (req, res) {
//app.get('/submit-name', function (req, res) {
//get name from request object
var name = req.query.name;
//var name = req.params.name;//

names.push(name);
//JSON Java string object notation - JSON converts objects to strings
res.send(JSON.stringify(names));  
});

var comments = [];
app.get('/article-one/submit-comment', function (req, res) {
//app.get('/article-one/submit-comment', function (req, res) {
//get comment from request object
var comment = req.query.comment;
//var comment = req.params.comment;//

comments.push(comment);
//JSON Java string object notation - JSON converts objects to strings
res.send(JSON.stringify(comments));  
});




app.get('/articles/:articleName', function (req, res) {
pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err,result){
    
        if (err) {
        res.status(500).send(err.toString());
        } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
          
        
        }
        
        
        
    });

});

/*app.get('/article-two', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/roses.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'roses.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
