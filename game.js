var gamePattern=[];

var userClickedPattern=[];
var startKeyPressed=false;
var level=0;


{
    $("body").keydown(function(){
        if(startKeyPressed==false){

            $("#level-title").text("Level "+level);

            nextSequence();
            
            startKeyPressed=true;
        }
    });
    
    
}


var buttonColors=["red","blue","green","yellow"];


$(".btn").click(function(event){
    var userChosenColor=event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length)-1);
    
})

function nextSequence()
{
    userClickedPattern=[];


    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColors=buttonColors[randomNumber];
    gamePattern.push(randomChosenColors);
    $("#"+randomChosenColors).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColors);
    
    level=level+1;
    $("#level-title").text("Level "+level);

    
    
    
}
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
       
         if(userClickedPattern.length==gamePattern.length)
         {
            setTimeout(function(){
                nextSequence();
            },1000);
         }
    }
    else{
       playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over!Press any key to restart");
        startOver();
    }
}
function startOver()
{
    level=0;
    gamePattern=[];
    startKeyPressed=false;
}
function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

