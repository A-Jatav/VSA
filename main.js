var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var my_camera = document.getElementById("camera");

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'png',
    png_quality: 90
});

function recordx() {
    document.getElementById("voicetext").innerHTML = "";
    recognition.start();
};

recognition.onresult = function (event) {
    console.log(event);
    var spoken = event.results[0][0].transcript;
    console.log(spoken);
    document.getElementById("voicetext").innerHTML = spoken;
    if (spoken.toLowerCase() == "take my selfie") {
        speak();
    }
};

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "taking your selfie in five seconds"
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
    timeout_start();
    Webcam.attach(my_camera);
};

function timeout_start() {
    setTimeout(function () {
        takeSnapShot();
    }, 5000);
};

function takeSnapShot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("finalselfie").innerHTML = "<img id='meselfiex' src='" + data_uri + "'>"
    })
    savemyselfie();
};

function savemyselfie() {
    var linkanchortg = document.getElementById("downloadlink");
    var image = document.getElementById("meselfiex").src;
    linkanchortg.href = image;
    linkanchortg.click();
};