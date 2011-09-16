seenVideos = [];

function callNewPlayer(){
// Call New Youtube API
if (!window['YT']) {var YT = {};}if (!YT.Player) {(function(){var p = document.location.protocol == 'https:' ? 'https:' : 'http:';var s = p + '//s.ytimg.com/yt/jsbin/www-playerapi-vfldznltS.js';var a = document.createElement('script');a.src = s;a.async = true;var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}
}

function onYouTubePlayerAPIReady() {
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    playNext();
  }
}

function stopVideo() {
  player.stopVideo();
}

function onPlayerError(event) {
  var errorMsg="";
  switch(parseInt(event.data)){
    case 2:
      errorMsg = "The request contains an invalid parameter value.";
      break;
    case 100:
      errorMsg = "The video requested was not found.";
      break;
    case 101:
      errorMsg = "The owner of the requested video does not allow it to be played in embedded players.";
      break;
    default:
      errorMsg = "Something went wrong."
      break;
  }
  displayMsg(errorMsg+" Skipping this Video...","error");
  setTimeout("playNext()", 1000);
}

function displayMsg(msg, type){
  var target = document.getElementById("ytapiplayer"),
      close = '<a class="close" onclick="hideNotice('+"'ytapiplayer'"+');" href="#">×</a>';
  target.className = target.className.replace(/\b error\b/,'');
  target.className = target.className.replace(/\b hidden\b/,'');
  target.className = target.className.replace(/\b notice\b/,'');
  target.className += " "+type;
  target.innerHTML = close + '<p><strong>' + msg + '</strong></p>';
  target.style.display = "block";
}

function clearSeenVideos(){
  seenVideos=[];
  playNext();
}

function playNext() {
  new Ajax.Updater('player',
                   '/player/embed?' + selectedUsersParams() + '&' + seenVideoParams(),
                   {asynchronous:true, evalScripts:true});
}

function selectedUsers() {
  return $$('input[type=checkbox]').select(function(e) { return e.checked; }).map(function(e) { return e.value; });
}

function selectedUsersParams() {
  return "users[]=" + selectedUsers().join("&users[]=");
}

function seenVideoParams() {
  return "seenVideos[]=" + seenVideos.join("&seenVideos[]=");
}

function hideNotice(id){
  if (document.getElementById){
    var noticeContainer = document.getElementById(id);
    noticeContainer.style.display = "none";
  }
}

function toggleClass(elem){
  var parentElem = elem.parentNode;
  var grandParentElem = parentElem.parentNode;
  parentElem.className = parentElem.className.replace(/\b active\b/,'');
  grandParentElem.className = grandParentElem.className.replace(/\b selected\b/,'');
  if (elem.checked){
    parentElem.className += " active";
    grandParentElem.className += " selected";
  }
  updatePlaylist();
}

function validateForm(){
  var elem = document.forms["the_form"]["email"] ? document.forms["the_form"]["email"] : document.forms["the_form"]["url"],
      parentElem = elem.parentNode;
  parentElem.className = parentElem.className.replace(/\berror\b/,'');
  if (elem.value==null || elem.value==""){
    parentElem.className += " error";
    return false;
  }
  return true;
}

function selectUsers(arg){
  var elem = document.forms["guest_list"] ? document.forms["guest_list"] : false;
  if (elem) {
    var boxes = elem["live"];
    for(var i=0; i<boxes.length;i++){
      switch(arg){
        case 'all':
          if (!boxes[i].checked){
            boxes[i].checked = true;
          }
          break;
        case 'none':
          if (boxes[i].checked){
            boxes[i].checked = false;
          }
          break;
        case 'some':
          var randomnumber = Math.floor(Math.random()*3),
              videocount = boxes[i].parentNode.next().getAttribute("data-attr-count");
          if (randomnumber<2 && videocount!=0){
            boxes[i].checked = true;
          } else {
            boxes[i].checked = false;
          }
          break;
        default:
          break;
      }
      toggleClass(boxes[i]);
    }
  }
  return false;
}

function updatePlaylist(){
  // Adding one, because seenVideos get updated after video starts playing
  var seen_video_count = parseInt(seenVideos.length) + 1,
      total_video_count = totalVideos();
  if (document.getElementById){
    var video_stat_container = document.getElementById("video_stat"),
        last_index = document.getElementById("last_index");
    last_index.innerHTML=total_video_count;
    video_stat_container.className = video_stat_container.className.replace(/\b hidden\b/,'');
  }
}

function totalVideos() {
  var selected_videos = selectedVideos(),
      count=0;
  for (var i=0; i<selected_videos.length;i++){
    count+=parseInt(selected_videos[i],10);
  }
  return count;
}

function selectedVideos() {
  return $$('input[type=checkbox]').select(function(e) { return e.checked; }).map(function(e) { return e.getAttribute("data-attr-count"); });
}