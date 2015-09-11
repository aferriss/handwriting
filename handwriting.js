var text = "i am a lazy good for nothing computer";
var proxyUrl = "http://localhost:8888/handwriting/proxy.php?url=";
var data = "?text=test&style=&bias=0.15&samples=3";
//var data = "?text=test&style=..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C973%2B905&bias=0.15&samples=3";
var url = "http://www.cs.toronto.edu/~graves/handwriting.cgi";
//url += data;

proxyUrl += url;
//proxyUrl += data;

console.log("searching for: "+ proxyUrl);

var writings = [];

var styles = [
	"../data/trainset_diff_no_start_all_labels.nc,973+905",
	"../data/trainset_diff_no_start_all_labels.nc,1082+554",
	"../data/trainset_diff_no_start_all_labels.nc,1495+898",
	"../data/trainset_diff_no_start_all_labels.nc,1970+378",
	"../data/trainset_diff_no_start_all_labels.nc,1561+872",
	"../data/trainset_diff_no_start_all_labels.nc,1527+719",
	""
];


var count = 0;

function getText(convertText){
	var randBias = Math.random();
	var randBiasString = randBias.toString();
	//if(count < 200){
	$.ajax({
		type: "POST",
		url: "getData.php",
		async: true,
		cache: false,
		timeout: 30000,
		data: {
			text: convertText,
			style:styles[5],
			dbias:"0.00000000001",
			//bias: randBiasString,
			samples:"1"
		},
		
		success: function(data){
			//console.log(data);
			var dummy = $('<div></div>');
			dummy.html(data);
			var imgs = $('img', dummy);
			imgs.splice(0, 6);		
			
			for(var im = 0; im <imgs.length; im++){
				writings.push(imgs[im]);
			}
			//console.log(writings);
			$('#container').html(writings);
		}, 
		error: function(rsp){
			console.log(rsp);
		}
	});
	//}
		
	//count++;
	setTimeout(getText(text), 1000);
	transcript = '';
}



getText(text);


//window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

//var recognizer = new window.SpeechRecognition();
var recognizer = new webkitSpeechRecognition();
recognizer.continuous = true;
recognizer.interimResults = true;

var transcript = '';

recognizer.onresult = function(event){
	//console.log(event);
	var said = [];
	//for(var i = event.resultIndex; i < event.results.length; i++){
		//if(event.results[i].isFinal){
			console.log(event.results[event.results.length-1][0].transcript);
			transcript += event.results[event.results.length-1][0].transcript;
			transcript = transcript.slice(0,99);
			//getText(transcript);

		//}
	//}
	//console.log("talk");
};

recognizer.onerror = function(event) {
	console.log(event);
};

recognizer.onend = function(){
	console.log("ended");
	recognizer.start();
};

recognizer.start();

