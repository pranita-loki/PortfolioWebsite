/*

Thank you to my great friend Eric Chiem for coding these awesome seeds for my website's homepage!
You are the best.

*/

var rotations = [];
var velocities = [];

var numberOfSeeds = 20;
var averageSeedSize = 57; //px
var maxSpeed = 150/60;
$(document).ready(function(){

spawnSeeds();

var t = setInterval(updateSeeds, 1000/60);


});

function spawnSeeds(){
	var containerHeight = $('#content').height();
	var containerWidth = $('#content').width();

	for (i = 0; i < numberOfSeeds; i++) {

		var img = $('<img>');
		var imgSize = averageSeedSize * normalRandom();
		rotations.push(Math.random() * 360);
		imgHeight = getHeight(imgSize * 100/55,imgSize, rotations[i]);
		imgWidth = getWidth(imgSize * 100/55, imgSize, rotations[i]);

		img.attr('src', "resources/seed.png");
		img.attr('id', "seed" + i);
		img.css({
			'height':  imgSize + 'px',
			'position': 'fixed',
			'transform' : 'rotate(' + rotations[i] + 'deg)',
			'margin-top' : Math.random() * (containerHeight - imgHeight) + (imgHeight/2) + 'px',
			'margin-left' : Math.random() * (containerWidth - imgWidth) + (imgWidth/2) + 'px',
		});
		//var imgHeight = averageSeedHeight * normalRandom();
		//var imgWidth = imgHeight * 100/55;
		img.appendTo('#content')

		velocities.push([maxSpeed * normalRandom(), maxSpeed * normalRandom()]);
		if(velocities[i][0] < 1) velocities[i][0] = 1;
		if(velocities[i][1] < 1) velocities[i][1] = 1;
		if(Math.random() >= 0.5) velocities[i][0] *= -1;
		if(Math.random() >= 0.5) velocities[i][1] *= -1;
	}
}

function updateSeeds(){

	var containerHeight = $('#content').height();
	var containerWidth = $('#content').width();

	for(i = 0; i < numberOfSeeds; i++){
		var seed = $('#seed' + i);
		var x = parseInt(seed.css("margin-left"));
		var y = parseInt(seed.css("margin-top"));

		x += velocities[i][0];
		y += velocities[i][1];

		seed.css({
			'margin-top' : y + 'px',
			'margin-left' : x + 'px',
		});
		if(parseInt(seed.css("margin-left")) < 0) velocities[i][0] = Math.abs(velocities[i][0]);
		else if(parseInt(seed.css("margin-left")) > containerWidth - getWidth(seed.height(), seed.width(), rotations[i])) velocities[i][0] = - Math.abs(velocities[i][0]);
		if(parseInt(seed.css("margin-top")) < 0) velocities[i][1] = Math.abs(velocities[i][1]);
		else if (parseInt(seed.css("margin-top")) > containerHeight - getHeight(seed.height(), seed.width(), rotations[i])) velocities[i][1] = -Math.abs(velocities[i][1]);
	}
}

function normalRandom(){
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}

function getWidth(width, height, rotation){
	return Math.abs(width * Math.sin(rotation)) + Math.abs(height * Math.cos(rotation));
}

function getHeight(width, height, rotation){
	return Math.abs(width * Math.cos(rotation)) + Math.abs(height * Math.sin(rotation));
}