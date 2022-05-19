song = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;
function preload(){
song = loadSound("music.mp3");
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function setup(){
canvas = createCanvas(550,600);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose',gotPoses);

}

function gotPoses(results){
if(results.length > 0){
console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("scoreLeftWrist = " + scoreLeftWrist);
leftWristX = results[0].pose.leftWrist.X;
leftWristY = results[0].pose.leftWrist.Y;

rightWristX = results[0].pose.rightWrist.X;
rightWristY = results[0].pose.rightWrist.Y;

console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY) ;
console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY) ;

}


}

function modelLoaded(){
console.log("PoseNet has been intiallised");

}

function draw(){
image(video ,0,0,550,600);
fill("#ff0000");
stroke("#ff0000");
if(scoreLeftWrist > 0.2){
circle(leftWristX,leftWristY,20);
InNumberLeftWristY = Number(leftWristY);
remove_decimals = floor(InNumberLeftWristY);
volume = remove_decimals/600;
document.getElementById("volume").innerHTML = "volume = " + volume;
song.setVolume(volume);

}
}