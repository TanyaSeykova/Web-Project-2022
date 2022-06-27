var startTime = 0;
var endTime = 0;
var pauseStartTime = 0;
var pauseEndTime = 0;
var pausedTime = 0;

document.getElementById("post").addEventListener("click", addComment);

document.getElementById("sort-comments").addEventListener("click", showComments);
document.getElementById("sort-subtitles").addEventListener("click", showSubtitles);
document.getElementById("sort-mistakes").addEventListener("click", showMistakes);

function showComments(){
  var comments = document.getElementById("comments-list").children;

  for(var i=0; i<comments.length; i++){
    if(comments[i].children[0].innerHTML == "Коментар"){

      comments[i].style.display = "block";
    }
    else comments[i].style.display = "none";

  }

}

function showSubtitles(){
  var comments = document.getElementById("comments-list").children;

  for(var i =0; i<comments.length; i++){
    if(comments[i].children[0].innerHTML == "Субтитри"){

      comments[i].style.display = "block";
    }
    else comments[i].style.display = "none";

  }

}
function showMistakes(){
  var comments = document.getElementById("comments-list").children;

  for(var i =0; i<comments.length; i++){
    if(comments[i].children[0].innerHTML == "Грешка"){

      comments[i].style.display = "block";
    }
    else comments[i].style.display = "none";

  }

}

function addComment() {

  timeOffset = new Date() - startTime - pausedTime;
   if (startTime == 0) timeOffset = 0;
  // console.log("start time is " + startTime);
  // console.log("pausedTime is " + pausedTime);

  // console.log("timeoffset is " + timeOffset);
  postComment(timeOffset);

}


function postComment(timeOffset) {
  var temp = document.getElementById('comment-template');
  var clon = temp.content.cloneNode(true);

  var comment = clon.firstElementChild;
  
  var commentBoxValue = document.getElementById("comment-box").value;
  var tag = document.getElementById("tag-select").value;

  //date and time
  var currentdate = new Date();
  var datetime = "Постнато на: " + currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " at "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes();

  comment.children[0].innerHTML = tag;
  comment.children[1].innerHTML = datetime;
  comment.children[2].innerHTML = commentBoxValue;
  comment.children[3].innerHTML = timeOffset;

  document.getElementById("comments-list").appendChild(clon);
  document.body.appendChild(clon);

}


