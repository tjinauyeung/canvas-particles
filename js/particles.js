window.onload = function(){

	var canvas = document.createElement("canvas"),
			c = canvas.getContext("2d"),
			particles = {},
			particleIndex = 0,
			particleNum = 150,
			grad = "black",
			radius = 1,
			titleAnimation,
			mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
			particleColor = "rgba( 255, 255, 255, 0.7)",
			circleColor = particleColor;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	document.body.appendChild(canvas);

	c.fillStyle = grad;
	c.fillRect(0,0,canvas.width,canvas.height);

	// resetting canvas size upon resizing browser window
	window.addEventListener("resize", function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});

	function Particle(){
		this.positionX = mousePos.x;
		this.positionY = mousePos.y;
		this.speedX = Math.random() * 10 - 5;
		this.speedY = Math.random() * 10 - 5;
		this.gravity = Math.random() * 10 - 5;
		this.life = 0;
		this.maxLife = 150;
		this.color = particleColor;

		particleIndex++;
		particles[particleIndex] = this;
		this.id = particleIndex;

	}

	Particle.prototype.draw = function() {
		this.positionX = this.positionX + this.speedX;
		this.positionY = this.positionY + this.speedY;

		// affect speed with another value
		if (Math.random() < 0.5) {
			this.speedY -= this.gravity;
			this.speedX -= this.gravity;
		}

		// delete particle after maxLife is reached
		this.life++;
		if (this.life === this.maxLife) {
			delete particles[this.id];
		}

		c.fillStyle = this.color;
		c.fillRect(this.positionX, this.positionY, 1.6, 1.6);
	};

	setTimeout(function generateParticles(){ 
		setInterval(function(){
			c.fillStyle = "black";
			c.fillRect(0,0,canvas.width,canvas.height);

			for(var i = 0; i < particleNum; i++){
				new Particle();
			}

			for (var i in particles){
				particles[i].draw();
			}
		}, 30);
	}, 2400);

	window.onmousemove = function (event) {
		event = event || window.event;
		mousePos.x = event.clientX;
		mousePos.y = event.clientY;
		particleColor = "rgba(" + parseInt(Math.random()*255, 10) + "," + parseInt(Math.random()*255, 10) + ",255, 0.7)";
	}

	// adding rippled circles on mouseclick 
	window.onclick = function draw() {
		c.strokeStyle = particleColor;
		c.beginPath();
		c.arc( mousePos.x, mousePos.y, radius, 0, 2 * Math.PI, false );
		c.stroke();
		radius += 1.2;
		radius < 160 ? requestAnimationFrame(draw) : radius = 10;
	};

	// adding audio element and autoplay after delay 
	setTimeout(function addAudio() {
		var audio = document.createElement("audio");
		audio.setAttribute("src", "audio/gassenhauer.mp3");
		audio.setAttribute("autoplay", "autoplay");
		document.body.appendChild(audio);
	}, 3600);

	// animation of the page title 
	titleAnimation = (function (){
		var title = document.getElementById('title');
		setTimeout(function titleFadeOut() {
			title.className = "fade_out";
		}, 4200);
	})();

	endAnimation = (function (){
		var end = document.getElementById('end');

		setTimeout(function endFadeIn() {
			end.style.opacity = 0.7;
			end.className = "fade_in";
		}, 30000);

		// setTimeout(function endFadeOut() {
		// 	end.style.opacity = 0;
		// }, 38000);

	})();

}