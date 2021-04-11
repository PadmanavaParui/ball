var ball;
var database, position, ballPosition;

// the setup function
function setup(){
    // adding the database
    database = firebase.database();

    // creating the canvas
    createCanvas(500,500);

    // creating the ball
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    // .ref() - refers to the database - ball position
    // .on() - listener - keeps track of the ball position

    ballPosition = database.ref("ball/position");
    ballPosition.on("value", readPosition, showError);
}

// the draw function
function draw(){
    background("white");
    
    if(keyDown(LEFT_ARROW)){
        writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+3);
    }

    drawSprites();
}

// the change position function
function writePosition(x,y){
    // writing the database position
    database.ref("ball/position").set({
        "x":position.x+x,
        "y":position.y+y
    })
}

// the read position function
function readPosition(data){
    // reading the database position
    // changing the ballx  and ball y position to the database position
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

// the show error function
// displaying the error
function showError(){
    // displaying the position in the console
    console.log("Error");
}