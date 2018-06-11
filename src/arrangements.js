var arrangements = [
    (count, size) => {
      let r = size/2;
      let xOffset = Math.floor((windowWidth  - size)/Math.max(count - 1, 1));
      let yOffset = Math.floor((windowHeight - size)/Math.max(count - 1, 1));
      return range(0,count).map(n => {
        let pos = createVector(
          n*xOffset + r,
          n*yOffset + r);
        //console.log(`windowWidth:${windowWidth}, windowHeight:${windowHeight}, r:${r}, pos.x:${pos.x}, pos.y:${pos.y}, bottom-right-corner.x:${pos.x + r}, bottom-right-corner.y:${pos.y + r}`);
        return pos;
      });
    },
    (count,size) => {
      let r = size/2;
      var dx = Math.floor((windowWidth  - size)/Math.max(count - 1, 1));
      var dy = Math.floor((windowHeight - size)/Math.max(count - 1, 1));
      var xs = range(0,count).map(n => n*dx + r);
      var ys = range(count-1,0).map(n => n*dy + r);
      return zipWith(xs, ys, createVector);
    },
    (count,size) => {
      return chevronArrangement(count,size,true);
    },
    (count,size) => {
      return chevronArrangement(count,size,false);
    },
    (count, size) => {
      let rowConfigurations = [
        [],
        [1],
        [2],
        [3],
        [2,2],
        [3,2],
        [3,3],
        [2,3,2],
        [3,2,3],
        [3,3,3],
        [3,4,3],
        [4,3,4],
        [4,4,4],
        [4,5,4],
        [5,4,5],
        [5,5,5]
      ];
      // Important: It is assumed that `count` will be between 0 and 15!
      let rowConfig = rowConfigurations[count];
      let yOffset = Math.floor(windowHeight/(rowConfig.length + 1));
      let positions = [];
      rowConfig.forEach((rowSize,rowIndex) => {
        let y = yOffset * (rowIndex + 1);
        let xOffset = Math.floor(windowWidth/(rowSize + 1));
        for(var xIndex=1; xIndex <= rowSize; xIndex++){
          let x = xOffset * xIndex;
          positions.push(createVector(x,y));
        }
      });
      return positions;
    }
];

function chevronArrangement(count,size,positive){
  var dx = Math.floor((windowWidth  - size)/Math.max(count - 1, 1));
  let r = size / 2;
  var w = windowWidth - size;
  var h = windowHeight - size;
  var xs = range(0,count).map(n => n*dx + r);
  var half = Math.floor(count / 2);
  var rows = count % 2 == 0 ? half : half + 1;
  var dy = Math.floor((windowHeight - size)/Math.max(rows - 1, 1));
  var _ys1 = range(0,half).map(n => {
    var yy = n * dy + r;
    return positive ? yy : windowHeight - yy;
  });
  var _ys2 = _ys1.slice(0,-1).reverse();
  if(count % 2 == 0){
    _ys1.pop();
  }
  var ys = Array.prototype.concat.call([], _ys1, _ys2);
  return zipWith(xs, ys, createVector);
}