objects = [];
status = "";

function preload(){

}

function setup(){
    canvas = createCanvas(480,380);
    canvas.position(480,390);

    video = createCapture(VIDEO);
    video.size(480,390);
    video.hide();
}



function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Detecting objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        objectDetector.detect(video,results);
        for(i = 0;i < objects.length;i++){
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%" + objects[i].x + 15 + objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = object_name + "Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(objectDetector);
                synth.speak(utterThis);                
            }
            else{
                document.getElementById("status").innerHTML = objectDetector + "Not found";
            }
        }
    }
}