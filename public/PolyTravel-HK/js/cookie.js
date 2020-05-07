function setCookie(dest,destValue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = dest + "=" + destValue + ";" + expires + ";path=/";
}

function getCookie(dest) {
  var name = dest + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var dest = getCookie("dest");
  if (dest != "") {
    Destination.value = dest;
  } /*else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("dest", dest, 30);
     }
  }*/
}

function deleteCookie() {
	document.cookie = "dest=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	location.href = '.';
}