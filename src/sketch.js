var flies;
var frog;
var lickedFlies;
var looping = true;
var waterHeight;
var flyCount = 5;
var flySounds;
var lickSound;
var ribitSounds;

function preload(){
  flySounds = range(1,flyCount*4).map(_ => loadSound("assets/fly-buzz.mp3"));
  lickSound = loadSound("assets/lick.mp3");
  ribbitSounds = range(1,5).map(n => loadSound("assets/ribbit-" + n + ".mp3"));
}

function setup() { 
  colorMode(HSL,255);
  waterHeight = windowHeight/2 - 50;
  //applyArrangement(arrangements[floor(random(arrangements.length - 1))]);
  frog = new Frog(lickSound, ribbitSounds);
  frog.lickFinished(() => {
    if(flies.length == 0){
      setTimeout(() => frog.ribbit(), 1000);
    }
    lickedFlies.forEach(f => f.die());
    lickedFlies.splice(0);
  });
  setupFlies();
  resizeCanvas(windowWidth, windowHeight);
} 

function setupFlies(){
  lickedFlies = [];
  flies = range(1,flyCount).map((_,i) => {
    let f = new Fly(
      createSprite(windowWidth/2, windowHeight/2, 50, 32),
      random(360),
      random(0,1) > 0.5,
      flySounds[i]);
    return f;
  });
  applyArrangement(arrangements[3]);
}

function addFly(){
  let f = new Fly(
    createSprite(random(windowWidth - 50 * 2), random(windowHeight - 32 * 2), 50, 32),
    random(360),
    random(0,1) > 0.5,
    flySounds[flies.length]);
  f.sprite.setCollider("circle",0,0,20);
  flies.push(f);
}

function removeFlies(){
  flies.forEach(f => {
    f.die();
  });
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
  if(key == 'R'){
    removeFlies();
    setupFlies();
  }
  if(keyCode == 32){
    addFly();
  }
  if(key in arrangements){
    applyArrangement(arrangements[key]);
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
    fly.sprite.setCollider("circle",0,0,20);
  });
}