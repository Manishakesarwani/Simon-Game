var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started=1;
var level=0;

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(event){
  if(started === 1){
    $("#level-title").html("Level "+level);
    nextSequence();
    started=0;
}
});

function nextSequence(){

  userClickedPattern=[];

  level++;
  $("#level-title").html("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  //console.log(randomChosenColour);
}

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
    }
    else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").html("Game Over, Press Any Key to Restart");
      startOver();
    }

}

function startOver(){
  level=0;
  gamePattern=[];
  started=1;
}
