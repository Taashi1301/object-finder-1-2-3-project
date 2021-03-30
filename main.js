alerts="";
status="";
objects=[];
function preload(){
    alerts=loadSound("alert.wav");
}
function setup(){
    canvas=createCanvas(350,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(350,350);
    video.hide();
}
function start(){
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    object_find=document.getElementById("object_find").value;
}
function modelLoaded(){
    console.log("Model has been loaded");
    status=true;
}

function draw(){
    image(video, 0, 0, 350, 350);
    if(status != ""){
            r=random(255);
            g=random(255);
            b=random(255);
            objectdetector.detect(video, gotResults);
        for(i=0; i < objects.length; i++){
            fill(r,g,b);
            stroke(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+ " "+percent+" %", objects[i].x, objects[i].y-15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label==object_find) {
                document.getElementById("status").innerHTML=object_find+" Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_find + "Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("status").innerHTML= object_find+" Not Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_find + "Not Found");
                synth.speak(utterThis);
            }
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        objects=results;
    }
}