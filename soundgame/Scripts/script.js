var canvas;
var centerX, centerY;
var complete = true;	
var endAngle = 0;


//var output, source;
    




window.onload = function(){

	draw();

}

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

	
	canvas.addEventListener('click', function(e) {
			buttonClick();
	},false);
		
				

	
	
	
	
	
  
}

function getMousePos(canvas, evt) {

    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function buttonClick(){
			
		var obj, txt;
		obj = {
            video: false,
            audio: true
        };
		txt = "<audio>";
	
		navigator.webkitGetUserMedia(obj, function(stream) {
			$("#result").empty();
			var output = $(txt).appendTo("#result")[0],
			source = window.webkitURL.createObjectURL(stream);
			output.autoplay = true;
			output.src = source;
			console.log(stream);
			window.a = stream; //debug
			$("span#name").html("Mic name: <b>" + stream.audioTracks[0].label + "</b>");
		}, function(err) {
			console.log(err);
			err.code == 1 && (alert("You can click the button again anytime to enable."))
		});
	
	
	if(complete){
		

		
		
		
		var timer =	setInterval(animateRecord,50);
	}else{
		    
        output.play();
	}
	
	

    function animateRecord(){
		
		if(complete){
				if(endAngle <= 2)
					endAngle += 0.010;
				else{
					complete = false;
				}
					
				c.beginPath();	
				c.arc(centerX,centerY,150,0,endAngle * Math.PI, false);
				c.lineWidth = 10;
				c.strokeStyle = "red";
				c.stroke();
				
				c.fillStyle = "red";
				c.font = "200px FontAwesome";
				c.fillText("\uf130", centerX - 65, centerY + 80 ,200);
				
			}else{
				clearInterval(timer);
				output.stop();
			}
	}



    function stopRecording(){
   
    }


    function sendAudio(){

    }

}



