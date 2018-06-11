function CircularArray(_items)
{
    let _index = 0;
    this.count = _items.length;
    this.getCurrent = function(){
      return _items[_index];
    }
    this.moveNext = function(){
        _index += 1;
        if (_index >= _items.length)
        {
            _index -= _items.length;
        }
    }
    this.movePrev = function(){
        _index -= 1;
        if (_index < 0)
        {
            _index = _items.length - 1;
        }
    }
}