
'use strict';

var fs = require('fs');
var bitmap = fs.readFileSync(process.argv[2]);
var bitmapObject = {};


bitmapObject.colorTable = new Buffer(256);
bitmap.copy(bitmapObject.colorTable,0,54,299);

invertColor(bitmapObject);

bitmapObject.colorTable.copy(bitmap,54);

//if the output file is not provided, default to filename invertedBMP.bmp
var output = process.argv[3] == null? 'invertedBMP.bmp':process.argv[3];

fs.writeFileSync(output,bitmap);

//invert the colors of a bitmap object
function invertColor(bitMapObj){
  var oldColor;
  var newColor;
  for(var i = 0; i <256; i=i+1){
    oldColor = bitMapObj.colorTable.readUInt8(i);
    newColor = 255-oldColor;
    bitMapObj.colorTable.writeUInt8(newColor,i);
  }
}


