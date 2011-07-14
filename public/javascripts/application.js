seenVideos = [];

function onYouTubePlayerReady(playerid) {
  ytplayer = document.getElementById("myytplayer");
  ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
  ytplayer.playVideo();
}

function onytplayerStateChange(stateId) {
  console.log(stateId);
  if(stateId == 0) {
    new Ajax.Updater('player',
                     '/player/embed?' + selectedUsersParams() + '&' + seenVideoParams(),
                     {asynchronous:true, evalScripts:true});
  };
}

function selectedUsers() {
  return $$('input[type=checkbox]').select(function(e) { return e.checked }).map(function(e) { return e.value })
}

function selectedUsersParams() {
  return "users[]=" + selectedUsers().join("&users[]=");
}

function seenVideoParams() {
  return "seenVideos[]=" + seenVideos.join("&seenVideos[]=");
}