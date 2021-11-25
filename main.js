objects=[];
video="";
status1="";
function setup(){
canvas=createCanvas(540,430);
canvas.center();
}
function preload(){
video=createVideo("video.mp4");
video.hide();
}
function start(){
    objectDetector =ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="status : detecting objects";
}
function draw(){
image(video,0,0,540,430);
if(status1 !=" "){
    objectDetector.detect(video,gotResult);
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="status : objects Detected";
        document.getElementById("number_of_objects").innerHTML="number of  objects Detected : " +objects.length;
        fill("#8c34eb");
        percent=floor(objects[i].confidence * 100);
        text(objects[i].label+" " +percent+" %",objects[i].x,objects[i].y);
        noFill();
        stroke("#eb34dc");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }
}

function modelloaded(){
    console.log("modelloaded");
    status1=true;
    video.loop();
    video.speed(1);
video.volume(1);
}
function gotResult(error,results) {
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}