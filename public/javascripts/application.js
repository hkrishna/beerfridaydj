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
  var grandParentElem = parentElem.parentNode;
  parentElem.className = parentElem.className.replace(/\b active\b/,'');
  grandParentElem.className = grandParentElem.className.replace(/\b selected\b/,'');
  if (elem.checked){
    parentElem.className += " active";
    grandParentElem.className += " selected";
  }
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

function selectAll(all){
  var elem = document.forms["guest_list"] ? document.forms["guest_list"] : false;
  if (elem) {
    var boxes = elem["live"];
    for(var i=0; i<boxes.length;i++){
      if (all){
        if (!boxes[i].checked){
          boxes[i].checked = true;
        }
      } else {
        if (boxes[i].checked){
          boxes[i].checked = false;
        }
      }
      toggleClass(boxes[i]);
    }
  }
  return false;
}