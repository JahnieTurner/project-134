status = '';
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        object_detector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: object detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are: " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);

    } else {
        console.log(results);
        objects = results;
    }
}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting object";
}