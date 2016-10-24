console.log('Loaded!');

//counter code

var button = document.getElementById('counter');
button.onclick = function() {
//create a request object
var request = new XMLHttpRequest();

//capture response and store it in a variable
request.onreadystatechange = function(){
    if(request.readyState == XMLHttpRequest.DONE){
       // if true take some action
        if(request.status ==200){
           var counter = request.responseText;
           var span = document.getElementById('count');
           span.innerHTML = counter.toString();
           }
     }
       // if not

     }; 

//make a request
request.open('GET', 'http://kaybeesan.imad.hasura-app.io/counter', true);
request.send(null);
};



//submit name
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
//create a request object
var request = new XMLHttpRequest();
//capture response and store it in a variable
request.onreadystatechange = function(){
    if(request.readyState == XMLHttpRequest.DONE){
       // if true take some action
        if(request.status ==200){
           var names = request.responseText;
           names =  JSON.parse(names);
           //capture a list of names and render it as a list
           var list = '';
           for (var i=0; i< names.length; i++) {
           list += '<li>' + names[i] + '</li>';
           }
         var ul = document.getElementById('namelist'); 
         ul.innerHTML = list;
       }
   }
}; 
//make a request
var nameInput = document.getElementById('name');
var name = nameInput.value;
request.open('GET', 'http://kaybeesan.imad.hasura-app.io/submit-name?name='+ name, true);
request.send(null);
};
//**************


//submit comment
var commentbtn = document.getElementById('comment_btn');
if (commentbtn){
commentbtn.onclick = function() {
   
//create a request object
 var request = new XMLHttpRequest();
//capture response and store it in a variable
request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
       // if true take some action
        if(request.status === 200){
           var comments = request.responseText;
           comments =  JSON.parse(comments);
           //capture a list of comments and render it as a list
           var clist = '';
           for (var i=0; i< comments.length; i++) {
           clist += '<li>' + comments[i] + '</li>';
           }
         var ul = document.getElementById('commentlist'); 
         ul.innerHTML = clist;
       }
    
    }

}; 

//make a request
var commentInput = document.getElementById('comment');
comment = commentInput.value;
request.open('GET','http://kaybeesan.imad.hasura-app.io/article-one/submit-comment?comment='+ comment, true);
request.send(null);
};
}
//**************************

