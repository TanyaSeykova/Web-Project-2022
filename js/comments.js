
document.getElementById("post").addEventListener("click", addComment);

function addComment() {
    var temp = document.getElementById('comment-template');
    var clon = temp.content.cloneNode(true);


    var commentBoxValue=document.getElementById("comment-box").value;
   
//date and time
var currentdate = new Date(); 
var datetime = "Постнато на: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
                // + ":" 
                // + currentdate.getSeconds();
    clon.children[0].innerHTML= datetime;     


//actual comment
//clon.children[1] is the <p> element with actual comment text
    clon.children[1].innerHTML= commentBoxValue;
    document.getElementById("comments-list").appendChild(clon);
    document.body.appendChild(clon);

  }