$(document).ready(function(){
    $(".main-left").hover(function(){
      $(".nav-overlay").css("display", "block");
      }, function(){
      $(".nav-overlay").css("display", "none");
    });
  });