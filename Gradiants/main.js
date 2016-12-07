var NUM_CIRCLES = 25;
var circleDiameter;
var circleRadius;
var rVal;
var gVal;
var bVal;

function setup(){
    createCanvas(1280, 720);
    circleDiameter = width/NUM_CIRCLES;
    circleRadius = circleDiameter/2;
    
    // frameRate(5);
    
    
}

function draw(){
    
    // fill(color(255, 255, 255));
    // stroke(color(255, 255, 255));
    rect(0,0,1280, 720);
    
    
    
    
    rVal = 255;
    gVal = 0;
    bVal = 0;
    
    
    
    
    var isShifted = false;
    
    var y = height;
    while (y >= 0 ){//height){
        
        var x;
        
        if (isShifted) {
            x = circleRadius;
        } else {
            x = 0;
        }
        
        while (x <= width){
            fill(color(rVal, gVal, bVal));
            stroke(color(rVal, gVal, bVal));
            ellipse(x,y, circleDiameter, circleDiameter);
            x = x + circleDiameter;
        }
        
        y = y - circleDiameter;
        isShifted =! isShifted;
        
        rVal = rVal - 2;
        gVal = gVal + 7;
        bVal = bVal + 3;
        
        
    }
    
    
}