import express from 'express';
import { Color, GpioMapping, LedMatrix } from 'rpi-led-matrix'
import { hexToColor } from './helper';
import { Pixel } from './pixel';

const app = express();
const port = 3000;

const matrix = new LedMatrix(
  {
  ...LedMatrix.defaultMatrixOptions(),
  rows: 32,
  cols: 64,
  hardwareMapping: GpioMapping.AdafruitHat
  },
  LedMatrix.defaultRuntimeOptions()
);

app.get('/', (req, res) => {

  matrix
  .clear()            // clear the display
  .brightness(50)    // set the panel brightness to 100%
  .fgColor(0x0000FF)  // set the active color to blue
  .fill()             // color the entire diplay blue
  .fgColor(0xFFFF00)  // set the active color to yellow
  // draw a yellow circle around the display
  .drawCircle(matrix.width() / 2, matrix.height() / 2, matrix.width() / 2 - 1)
  // draw a yellow rectangle
  .drawRect(matrix.width() / 4, matrix.height() / 4, matrix.width() / 2, matrix.height() / 2)
  // sets the active color to red
  .fgColor({ r: 255, g: 0, b: 0 })
  // draw two diagonal red lines connecting the corners
  .drawLine(0, 0, matrix.width(), matrix.height())
  .drawLine(matrix.width() - 1, 0, 0, matrix.height() - 1)
  .sync();

  res.send('The sedulous hyena ate the antelope!');
});

app.post('/pixel', (req, res) => {

  const pxl: Pixel = req.body;

  matrix
  .clear()            // clear the display
  .brightness(100)    // set the panel brightness
  .bgColor(hexToColor(pxl.color))
  .setPixel(pxl.col, pxl.row)
  .sync();

  res.status(200);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})