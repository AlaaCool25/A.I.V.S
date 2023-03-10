objects = [];
video = "";
status = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") 
    {
        objectDetector.detect(video, gotResult);
        for (i  = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_object").innerHTML = "Number Of Objects Are : " + objects.length;

            fill('#fc77d4');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke('#fc77d4');
            rect(object[i].x + 15, object[i].y + 15, object[i].width + 15, object[i].height + 15);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects.....";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error, results) 
{
    if (error) 
    {
        console.log(error);
    } 
    else 
    {
        console.log(results);
        objects = results;
    }
}