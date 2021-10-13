$(document).ready(function () {
  $(".main-left").hover(function () {
    $(".nav-overlay").css("display", "block");
  }, function () {
    $(".nav-overlay").css("display", "none");
  });
});
// document.getElementsByClassName("tablink")[0].click();

function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("w3-yellow");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-yellow");
}


