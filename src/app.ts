// Express imports
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'

// https://www.npmjs.com/package/rpi-led-matrix
import { GpioMapping, LedMatrix } from 'rpi-led-matrix'

// Own imports
import { hexToColor } from './helper';
import { Pixel } from './pixel';

const app = express();
const port = 3000;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const matrix = new LedMatrix(
  {
    ...LedMatrix.defaultMatrixOptions(),
    rows: 32,
    cols: 64,
    hardwareMapping: GpioMapping.AdafruitHat
  },
  LedMatrix.defaultRuntimeOptions()
);

app.post('/pixel', (req, res) => {

  const pxl: Pixel = req.body;

  if (pxl !== null) {

    let clr = hexToColor(pxl.color);
    console.log('POST pixel', pxl, clr);

    matrix
      .brightness(pxl.brightness)    // set the panel brightness
      .fgColor(clr)
      .setPixel(pxl.position.col, pxl.position.row)
      .sync();
  }

  res.status(200);
  res.send(JSON.stringify({ message: 'OK' }));
})

app.post('/clear', (req, res) => {
  matrix
    .clear()
    .sync();

  res.status(200);
  res.send(JSON.stringify({ message: 'OK' }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})