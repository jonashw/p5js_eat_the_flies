function Fly(sprite,direction,cw,snd){
  snd.loop();
  snd.setVolume(0.01);
  snd.jump(random(5));
  let directionDelta = cw ? 20 : -20;
  let buzzing = sprite.addAnimation("buzzing", "assets/fly-01.png", "assets/fly-03.png");
  buzzing.frameDelay = 1;
  sprite.addAnimation("still", "assets/fly-01.png");
  this.sprite = sprite;
  this.update = () => {
    direction += directionDelta;
    sprite.setSpeed(1, direction);
    let panning = map(sprite.position.x, 0, width, -1.0, 1.0);
    snd.pan(panning);
  };
  this.caught = () => {
    sprite.changeAnimation("still");
  };
  this.getPosition = () => sprite.position;
  this.setPosition = pos => {
    sprite.position = pos;
  };
  this.die = () => {
    sprite.remove();
    snd.setVolume(0, 0.5);
    setTimeout(() => snd.stop(), 1000);
  };
}