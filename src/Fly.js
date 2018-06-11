function Fly(sprite,direction,cw){
  let directionDelta = cw ? 20 : -20;
  let buzzing = sprite.addAnimation("buzzing", "assets/fly-01.png", "assets/fly-03.png");
  buzzing.frameDelay = 1;
  sprite.addAnimation("still", "assets/fly-01.png");
  this.sprite = sprite;
  this.update = () => {
    direction += directionDelta;
    sprite.setSpeed(1, direction);
  };
  this.caught = () => {
    sprite.changeAnimation("still");
  };
  this.getPosition = () => sprite.position;
  this.setPosition = pos => {
    sprite.position = pos;
  };
}