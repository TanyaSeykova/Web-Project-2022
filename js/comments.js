var startTime = 0;
var endTime = 0;
var pauseStartTime = 0;
var pauseEndTime = 0;
var pausedTime = 0;

document.getElementById("post").addEventListener("click", addComment);

function addComment() {

  timeOffset = new Date() - startTime - pausedTime;
  if(startTime == 0) timeOffset = 0;
  console.log("start time is " + startTime);
  console.log("pausedTime is " + pausedTime);

  console.log("timeoffset is " + timeOffset);
  //setTimeout(postComment, timeOffset);
  postComment(timeOffset);

}


function postComment(timeOffset) {
  var temp = document.getElementById('comment-template');
  var clon = temp.content.cloneNode(true);

  var comment = clon.firstElementChild;
  var commentBoxValue = document.getElementById("comment-box").value;

  //date and time
  var currentdate = new Date();
  var datetime = "Постнато на: " + currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " at "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes();

  comment.children[1].innerHTML = timeOffset;



  //actual comment
  //comment.children[2] is the <p> element with actual comment text
  comment.children[2].innerHTML = commentBoxValue;
  document.getElementById("comments-list").appendChild(clon);
  document.body.appendChild(clon);

}


