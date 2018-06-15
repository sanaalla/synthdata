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
var tSize = 500; 
var getyear;
var myFont;

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


// A function to play a note
function playNote(position, duration, osc, lower, upper) {
  midi = round(map(position, lower, upper, 57, 93));
  
  osc.freq(midiToFreq(midi));
  
  // Fade it in
  osc.fade(0.5,0.2);

}

//function year()
//{
    //getyear = data.getColumn('Year');
    //fill('#000000');
    //noStroke();
    //textAlign(CENTER);
   // textFont(myFont);
    //textSize(tSize);
    //text(getyear,windowWidth/2,(windowHeight/2)+(tSize/4));

//}


function draw() {
  
  // If we are autoplaying and it's time for the next note
  if (autoplay && (millis() > trigger)){
    
playNote(data.get(index, 'Mass_index'), 0, osc1, mass_min, mass_max);
      
   playNote(data.get(index, 'Year'), 400, osc2, year_min, year_max);
      
    var vol = map(data.get(index, 'Mass_index'), mass_min, mass_max, 1, 3.0);
    console.log(vol)
          

      
    masterVolume(vol);
    
    trigger = millis() + tick;
    

    // Move to the next note
    index++;
  // We're at the end, stop autoplaying.
      
        /// fill('#000000');
    //noStroke();
    //textAlign(CENTER);
    //textFont(myFont);
   // textSize(tSize);
   // text(getyear,windowWidth/2,(windowHeight/2)+(tSize/4));
  }
    
 if (index >= data.getRowCount()) {
    osc1.stop()
    osc2.stop()
  }
}