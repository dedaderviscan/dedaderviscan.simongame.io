//Simon Game Testing and Developing 
var buttonColours =  ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0; 

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userClickedPattern);
  
    checkAnswer(userClickedPattern.length-1);
} );

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        gameOverAnimation();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
}
    
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    // do these
    $("#" + currentColour).addClass("pressed");
    setTimeout( function(){
      $("#" + currentColour).removeClass("pressed");
    },100 );
}

function gameOverAnimation() {
    $("body").addClass("game-over");
    setTimeout( function(){
      $("body").removeClass("game-over");
    },200 );
}

function startOver() {
    level = 0; 
    gamePattern = [];
    started = false; 
}
