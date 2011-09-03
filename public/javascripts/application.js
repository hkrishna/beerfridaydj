seenVideos = [];

function onYouTubePlayerReady(playerid) {
  ytplayer = document.getElementById("myytplayer");
  ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
  ytplayer.playVideo();
}

function onytplayerStateChange(stateId) {
  if(stateId == 0) {
    playNext();
  };
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
  if (!elem.checked){
   parentElem.className = parentElem.className.replace(/\bactive\b/,'');
  } else {
    parentElem.className += " active";
  }
}