prediction = "";

Webcam.set({
    width:400,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:' , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/avTBzFCKY/model.json' , modelLoaded);

function modelLoaded() {
    console.log('Model loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "According to prediction, it is " + prediction + "gesture.";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function predictEmotion() {
    img = document.getElementById('captured_image');
    classifier.classify(img , gotresult);
}

function gotresult(error,results) {
    if (error) {
        console.error(error);
    } 
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[1].label;
        prediction = results[1].label;
        speak();
        if(results[1].label == "Thumbs Up"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[1].label == "Thumbs Down"){
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if(results[1].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[1].label == "Wonderful"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
    }
}