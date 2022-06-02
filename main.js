song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.position(400, 200);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#f00202");
    stroke("#f00202");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }
        if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
        if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }
        if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2){
        Circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimal = floor(InNumberleftWristY);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "VOLUME = " + volume;
    }
}

function play_1(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("MODEL IS LOADED");
}

function gotPoses(results){
if(results.length > 0){
    console.log(results);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
}
}
