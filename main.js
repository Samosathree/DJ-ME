song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("It is done");
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#6a5acd");
    stroke("#5218fa");
   
    if(scoreRightWrist > 0.2){
    circle(rightWristX, rightWristY, 20);
    console.log("IF is working :D");
    if (rightWristY >0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "U have unleashed 0.5, tiny";
        speed.rate(0.5);
    }
    else if (rightWristY >100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "U have unleashed 1, a bit better";
        speed.rate(1);
    }
    else if (rightWristY >200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "U have unleashed 1.5, STOP USING DECIMALS!";
        speed.rate(1.5);
    }
    else if (rightWristY >300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "U have unleashed 2, silver medal";
        speed.rate(2);
    }
    else if (rightWristY >400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "U have unleashed 2.5, Scp foundation this user is 2 powerful!";
        speed.rate(2.5);
    }
    
}
    if (scoreLeftWrist > 0.2){

    circle(leftWristX, leftWristY, 20);
    InNumberLeftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberLeftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);
}
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keyPoints[9].score;
       scoreLeftWrist = results[0].pose.keyPoints[9].score;
       console.log("scoreRightWrist = "+scoreRightWrist+" scoreLeftWrist = "+scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}