var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level=0;
var i=0;

function nextSequence()
{
  userClickedPattern.length=0;
  level++;
  $("h1").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


$(".btn").click(function(e){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentlevel)
{
  if(userClickedPattern[currentlevel] === gamePattern[currentlevel])
    i++;
  else
  {
    var audi = new Audio("sounds/wrong.mp3");
    audi.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over! press any Key/start Key to restart!")
    startOver();
  }

  if(currentlevel===gamePattern.length -1)
  {
    i=0;
    setTimeout(function(){
      nextSequence();
    },1000);
}
}


var st=0;
$("#reset").click(function(){
  setTimeout(function(){
    $("h1").text("Press any Key/start Key to start");
    startOver();
  });
});

$("#start").click(function(){
  if(st===0)
  {
    setTimeout(function(){
      nextSequence();
    },300);
    st++;
  }
});

$(document).keypress(function(){
  if(st===0)
  {
    setTimeout(function(){
      nextSequence();
    },300);
    st++;
  }

});


function animatePress(currentColour)
{
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}


function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
audio.play();
}


function startOver()
{
  gamePattern.length=0;
  st=0;
  level=0;
}
