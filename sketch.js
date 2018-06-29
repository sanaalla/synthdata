// Data variable
var data;

// For automatically playing the song
var index = 0;
var trigger = 0;
var autoplay = false;

// set a total length of 1 minute (60000 millis)
var total_length = 10000000;
var tick;
var osc;

// min/max
var year_min;
var year_max;
var mass_min;
var mass_max;
var getyear;

function preload() {
  var url = 'data/meteorite.csv';
  data = loadTable(url, "csv", "header");
myFont = loadFont('BarlowCondensed-Thin.otf');


}

function setup() {
      createCanvas(windowWidth, windowHeight);

  //count the columns
  print(data.getRowCount() + " total rows in table");
  print(data.getColumnCount() + " total columns in table");

  // compute attributes of data for sonification
  tick = total_length / data.getRowCount();
  year_min = min(data.getColumn('Year'));
  year_max = max(data.getColumn('Year'));
  
  mass_min = min(data.getColumn('Mass_index'));
  mass_max = max(data.getColumn('Mass_index'));
  

 
  // debugging statements
  console.log('Total Duration: ' + tick);
  console.log('Year Min: ' + year_min);
  console.log('Year Max: ' + year_max);
  
  console.log('Mass Min: ' + mass_min);
  console.log('Mass Max: ' + mass_max);
  
 
  // mass oscillator
  osc1 = new p5.SinOsc();
   // year oscillator
  osc2 = new p5.TriOsc();

}


// A function to play the year note
function playNote(position, duration, osc, lower, upper) {
  midi = map(position, lower, upper, 51, 96);
  
  osc.freq(midiToFreq(midi));
  
  // Fade it in
  osc.fade(0.5,0.2);

}



// A function to play the mass note
function playNote2(position, duration, osc, lower, upper) {
  midi = map(position, lower, upper, 48, 108);
  
  osc.freq(midiToFreq(midi));
  
  // Fade it in
  osc.fade(0.5,0.2);

}



function draw() {
  
  // If we are autoplaying and it's time for the next note
  if (autoplay && (millis() > trigger)){
    
playNote2(data.get(index, 'Mass_index'), 0, osc1, mass_min, mass_max);
      
   playNote(data.get(index, 'Year'), 0, osc2, year_min, year_max);
      
    var vol = map(data.get(index, 'Mass_index'), mass_min, mass_max, 1, 3.0);
    

    document.getElementById("yearbutton").innerHTML = "year " + data.get(index,'Year');
    document.getElementById("massbutton").innerHTML = "mass " + data.get(index,'Mass_index');
          

      
    masterVolume(vol);
    
    trigger = millis() + tick;
    

    // Move to the next note
    index++;
      
  }
    
 if (index >= data.getRowCount()) {
    osc1.stop()
    osc2.stop()
  }
}

function playbutton(){
	autoplay=!autoplay;
	osc1.start(); 
	osc2.start();
	if ( document.getElementById("mainplaybutton").innerHTML === "pause data loop"){
		document.getElementById("mainplaybutton").innerHTML = "play data loop";
	}else{
		document.getElementById("mainplaybutton").innerHTML = "pause data loop";
	}
}




