var text = "testWords this is going to be a lot of words at least more than 100 characters totally definitely I'm typing like crazy you know how it is right right right ya i thought so tgive me a bear or some other animal";
var proxyUrl = "http://localhost/handwriting/proxy.php?url=";
var data = "?text=test&style=&bias=0.15&samples=3";
//var data = "?text=test&style=..%2Fdata%2Ftrainset_diff_no_start_all_labels.nc%2C973%2B905&bias=0.15&samples=3";
var url = "http://www.cs.toronto.edu/~graves/handwriting.cgi";
//url += data;

proxyUrl += url;
proxyUrl += data;

console.log("searching for: "+ proxyUrl);

$.ajax({
	type: "get",
	url: proxyUrl,
	/*
	data: {
		text: text,
		style:"",
		bias:"0.15",
		samples:"3"
	},
	*/
	success: function(data){
		console.log(data);
		//$('#container').html(data);
	}, 
	error: function(rsp){
		console.log(rsp);
	}
});