//module P6
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));
var articles = {
    'article-one' : {
    title: 'Article One',
    heading: 'Article One',
    date: '19th, Sepember',
    content:
`<p>` +
`This is the content of first article. Using the console. 
       This console allows you to write server-sidecode and deploy it to your website. Learn how this console actually works in the section below.`  + 
`</p>` +
`<p>` +
     
`1. How to write code & test your app

   Click on a filename. Edit its contents.
   Click on Commit & Restart.
   Click on the Logs link or open it in a new tab to see what is happening to your server process
   Click on the Go to app link, or open it in a new tab
   Your app is now live! (It may take a few minutes before you see your changes applied)` +
`</p>`  + 
`<p>` +
`2. Your source code

Files on the sidebar represent the source code of your web app. These files are all actually saved in a git repository on your github account. This console allows you to edit these files, deploy your app, and save these files back to your github repository.` +

`</p>`
      
},

   'article-two' : {
        title: 'Article Two',
        heading: 'Article Two',
        date: '20th, Sepember',
        content:
        `<p>` +
             `This is the content of second article. Using the console. 
             This console allows you to write server-sidecode and deploy it to your website. Learn how this console actually works in the section below. ` +  
       ` </p>` 
},
   
   'article-three' : {
       title: 'Article Three',
        heading: 'Article Three',
        date: '21st, Sepember',
        content:
        `<p>` +
             `This is the content of third article. Using the console. 
             This console allows you to write server-sidecode and deploy it to your website. Learn how this              console actually works in the section below.` + 
        
        `</p>`
   }
};
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
                ${date}
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


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
    //articlename = article-one
    //articles(articleName) = () content object for article one
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
