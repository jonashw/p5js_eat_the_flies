function Frog(){
  var _lickingTargetPosition = createVector(0,0);
  var _lickingTimeout;
  var _lickingTimeLeft;
  var lickingDuration = 15;
  var _lickingIn = true;
  var _lickFinished = new Observable();
  var lilyPad = createSprite(windowWidth/2, windowHeight/2 + 100, 628, 56);
  lilyPad.addAnimation("normal","assets/lily-pad.png");
  var body = createSprite(windowWidth/2, windowHeight/2, 200, 200);
  body.addAnimation("resting","assets/frog-normal.png");
  body.addAnimation("licking","assets/frog-licking.png");
  this.body = body;
  var eyes = [-1,1].map(dx => {
    let e = createSprite (windowWidth/2 + dx*38, windowHeight/2-67, 51, 51);
    e.addAnimation("normal","assets/eye-normal.png");
    e.addAnimation("looking","assets/eye-looking.png");
    return e;
  });
  var tongueCenter = createVector(body.position.x, body.position.y - 5);
  let tongueTip = createSprite(windowWidth/2, windowHeight/2, 25, 25);
  tongueTip.addAnimation("normal","assets/tongue-tip.png");
  tongueTip.setCollider("circle",0,0,25);
  tongueTip.visible = false;
  this.tongueTip = tongueTip;
  this.lickFinished = o => _lickFinished.addObserver(o);
  this.update = () => {
    if(_lickingTimeLeft == undefined){
        tongueTip.visible = false;
        body.changeAnimation("resting");
    } else {
      if(_lickingTimeLeft > 0){
        let d = Easing.Quadratic.Out((lickingDuration - _lickingTimeLeft) / lickingDuration);
        if(_lickingIn){
            tongueTip.position.x = (d)*_lickingTargetPosition.x + (1-d) * tongueCenter.x;
            tongueTip.position.y = (d)*_lickingTargetPosition.y + (1-d) * tongueCenter.y;
        } else {
            tongueTip.position.x = (1-d)*_lickingTargetPosition.x + d * tongueCenter.x;
            tongueTip.position.y = (1-d)*_lickingTargetPosition.y + d * tongueCenter.y;
        }
        _lickingTimeLeft -= 1;
      } else {
        if(_lickingIn){
            _lickingTimeLeft = lickingDuration;
            _lickingIn = false;
            return;
        } else {
            tongueTip.visible = false;
            _lickingTimeLeft = undefined;
            _lickingIn = true;
            _lickFinished.notify();
        }
      }
      return;
    }
  };
  this.tryLick = pos => {
    if(_lickingTimeLeft){
        return;
    }
    body.changeAnimation("licking");
    eyes.forEach(e => e.changeAnimation("looking"));
    _lickingTimeLeft = lickingDuration;
    tongueTip.visible = true;
    _lickingTargetPosition.x = pos.x;
    _lickingTargetPosition.y = pos.y;
    tongueTip.position.x = tongueCenter.x;
    tongueTip.position.y = tongueCenter.y;
    eyes.forEach(e => {
      let diff = p5.Vector.sub(_lickingTargetPosition, e.position);
      let heading = degrees(diff.heading());
      e.rotation = heading;
    });
  };
  this.draw = () => {
    if(_lickingTimeLeft == undefined){
        tongueTip.visible = false;
      return;
    }
    stroke(2,216,165);
    strokeWeight(20);
    line(tongueCenter.x, tongueCenter.y, tongueTip.position.x, tongueTip.position.y);
  };
}

function Observable(){
  var _observers = [];
  this.addObserver = o => _observers.push(o);
  this.notify = () => {
    let args = Array.prototype.slice.call(arguments,0);
    //console.log('arguments:', args);
    _observers.forEach(o => o.apply(args));
  };
}