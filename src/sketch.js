var flies;
var frog;
var lickedFlies = [];
var looping = true;
var waterHeight;

function setup() { 
  colorMode(HSL,255);
  waterHeight = windowHeight/2 - 50;
  //applyArrangement(arrangements[floor(random(arrangements.length - 1))]);
  frog = new Frog();
  frog.lickFinished(() => {
    lickedFlies.forEach(f => f.sprite.remove());
    lickedFlies.splice(0);
  });
  flies = range(1,15).map(_ => {
    let f = new Fly(
      createSprite(windowWidth/2, windowHeight/2, 50, 32),
      random(360),
      random(0,1) > 0.5);
    //f.sprite.setCollider("circle",0,0,20);
    return f;
  });
  applyArrangement(arrangements[3]);
  flies.forEach(f => {
    f.sprite.setCollider("circle",0,0,20);
  });
  resizeCanvas(windowWidth, windowHeight);
} 

function mouseMoved(){ frog.lookAt(createVector(mouseX,mouseY)); }
function touchMoved(){ frog.lookAt(createVector(mouseX,mouseY)); }

function touchStarted(){
  if(touches.length > 0 ){
    let touch = touches[touches.length - 1];
    handlePointAction(touch);
  }
  return false; // This is to prevent pinch-zooming on touch devices.
}

function mousePressed(){
  handlePointAction(createVector(mouseX,mouseY));
}

function handlePointAction(point){
    frog.tryLick(point);
}

function tongueCollidesWithFly(tongue, flySprite){
  //fly.remove();
  let fly = flies.filter(f => f.sprite == flySprite)[0];
  lickedFlies.push(fly);
  let index = flies.indexOf(fly);
  flies.splice(index,1);
}

function keyPressed(){
  if(key == 'D'){
    allSprites.forEach(s => s.debug = !s.debug);
  }
  if(keyCode == ESCAPE){
    looping = !looping;
    if(looping){
      loop();
    } else {
      noLoop();
    }
  }
}

function draw() { 
  background(102,74,100);
  push();
  noStroke();
  fill(132,115,114);
  rect(0, windowHeight - waterHeight, windowWidth, waterHeight);
  pop();
  for(var i=0; i<flies.length; i++){
    let fly = flies[i];
    fly.update();
    frog.tongueTip.overlap(fly.sprite,tongueCollidesWithFly);
  }
  for(var i=0; i<lickedFlies.length; i++){
    let fly = lickedFlies[i];
    fly.sprite.position.x = frog.tongueTip.position.x;
    fly.sprite.position.y = frog.tongueTip.position.y;
  }
  frog.update();
  drawSprites();
  frog.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function applyArrangement(arrangement){
  zip(
    flies,
    arrangement(flies.length, 50))
  .forEach(([fly,pos]) => {
    fly.setPosition(pos);
  });
}