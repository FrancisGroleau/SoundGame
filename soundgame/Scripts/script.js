var canvas;
var centerX, centerY;
var complete = true;	
var endAngle = 0;

var audio_context;
var recorder;
var au;


// draw the balls on the canvas
function draw(){

	canvas = document.getElementById("canvas"),
	c = canvas.getContext("2d");
	canvas.width = 300;
	canvas.height =  300;
			

	canvas = document.getElementById("canvas");
	// check if supported


    //clear canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

	//draw the button
	  centerX = canvas.width / 2;
      centerY = canvas.height / 2;
	  
	//draw the gLyph
	c.fillStyle = "white";
	c.font = "200px FontAwesome";
	c.fillText("\uf130", centerX - 65, centerY + 80 ,200);

	

		
	//c.clearRect(0, 0, canvas.width, canvas.height);
		//draw();
  
}


function buttonClick(){
		//if(complete){
			startRecording();
			$('#canvas').css("background-color","#3071a9");
			var timer =	setInterval(animateRecord,20);
			//var timer2 = setTimeout(function(){clearInterval(timer);clearTimeout(timer2)},4200);
		//}else{
			complete = true;
			endAngle = 0;
			//startRecording();
			//buttonClick();
		
		//}
	
}
	

function animateRecord(){
	if(complete){
		if(endAngle <= 2){
		
			endAngle += 0.010;
			c.beginPath();	
			c.arc(centerX,centerY,150,0,endAngle * Math.PI, false);
			c.lineWidth = 10;
			c.strokeStyle = "red";
			c.stroke();
					
			c.fillStyle = "red";
			c.font = "200px FontAwesome";
			c.fillText("\uf130", centerX - 65, centerY + 80 ,200);		
				
		}else{
			complete = false;
			stopRecording();
		}
				
		
	}
}




  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    //__log('Media stream created.');
    
    input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');
    
    recorder = new Recorder(input);
    //__log('Recorder initialised.');
  }

  function startRecording() {
    recorder && recorder.record();
  }

  function stopRecording() {
    recorder && recorder.stop();
    
    // create WAV download link using audio data blob
    createDownloadLink();
    
	$('#canvas').css("background-color","#428bca");
	draw();
	
    recorder.clear();
  }

  function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      //var li = document.createElement('li');
      au = document.createElement('audio');
      //var hf = document.createElement('a');
      
      //au.controls = true;
      au.src = url;
	  $('.playback').css("visibility","visible");
      //hf.href = url;
      //hf.download = new Date().toISOString() + '.wav';
      //hf.innerHTML = hf.download;
      //li.appendChild(au);
      //li.appendChild(hf);
      //recordingslist.appendChild(li);
    });
  }

  window.onload = function init() {
   draw();
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext;
      //__log('Audio context set up.');
      //__log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
     // __log('No live audio input: ' + e);
	 
	 
	 
    });
	
	
	canvas.addEventListener('click', function(e) {
			buttonClick();
	},false);
	
	$('.play').click(function(){
	
		au.play();
		
		var progress = setInterval(function () {
			var $bar = $('.prog');

			if ($bar.attr('aria-valuenow') >= 100) {
				clearInterval(progress);
			} else {
				$bar.attr('aria-valuenow',$bar.attr('aria-valuenow') + 0.10);
				var   bar_width = $bar.attr('aria-valuenow');
					$bar.width(bar_width + '%');
				
				
			}
			//$bar.text($bar.width() / 4 + "%");
		},400);
		
		
	
	});
  };








		
		
	





