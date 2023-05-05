img = "";
status = "";
objects = [];


function preload(){

}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
     for (i = 0; i < objects.length; i++)   
     {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number").innerHTML = "Number of Objects Detected : "+objects.length;
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " "+percent+"%"+" " , objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
     }
    }

   

    
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function modelLoaded() {
    console.log('modeloaded')
    status = true;
    objectDetector.detect(video, gotResults);
}
