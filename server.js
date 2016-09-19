var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articleOne = {
    title: 'Article One',
    heading: 'Article One',
    date: '19th, Sepember',
    content: `
<p>
This is the content of first article. Using the console. 
       This console allows you to write server-sidecode and deploy it to your website. Learn how this console actually works in the section below.   
</p>
<p>
     
1. How to write code & test your app

   Click on a filename. Edit its contents.
   Click on Commit & Restart.
   Click on the Logs link or open it in a new tab to see what is happening to your server process
   Click on the Go to app link, or open it in a new tab
   Your app is now live! (It may take a few minutes before you see your changes applied)
</p>   
<p>
2. Your source code

Files on the sidebar represent the source code of your web app. These files are all actually saved in a git repository on your github account. This console allows you to edit these files, deploy your app, and save these files back to your github repository.
</p>
<p>
3. Editing your files

To edit your files, choose the filename from the sidebar and edit it. When you edit files, these files are not saved back to your github repository. If you make any changes to your files and refresh this page then you will notice that your changes have disappeared.
</p>
<p>
4. Saving your files to github

After you make changes to your file, any unsaved changes will be noticed and a * will appear next to the filename. If you the Commit to github button, these files will be saved to your github repo.
</p>
<p>
5. Deploying your app with changes to source code

When you click on the Commit & restartbutton on the sidebar, the files in this console are committed to your github project and your server process is restarted with these new changes. Your server is accessible on a URL unique to your server: kaybeesan.imad.hasura-app.io
Note:Files that are deployed to the server are files as they are currently on this console. These files may or may not be saved to your github repo.
</p>`
    
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
       </div>
    </body>
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));

});


app.get('/article-one', function (req, res) {
    res.send(createTemplate(articleOne));
});

app.get('/article-two', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
