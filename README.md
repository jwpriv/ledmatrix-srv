# ledmatrix-srv
ledmatrix server component

This is a prototype for a simple Raspberry Pi Server used to control my LED Matrix using Express.js and an Arduino HAT.

## Required components

LED-Matrix with HUB75 Connection: https://www.amazon.de/gp/product/B06XNJZN89
Adafruit RGB Matrix Bonnet: https://www.amazon.de/gp/product/B07DNBLXV2
Raspberry Pi, I am using a Raspberry 3 model B, other models will work, too.

There are many other compatible LED-Matrices and another Adafruit RGB Controller + RTC which I think will also work.

## Dependencies

I am using the great node.js binding 'rpi-led-matrix' from alexden which does all the heavy lifting 😉: https://github.com/alexeden/rpi-led-matrix

## Installation

After installing Rasperry Pi OS Lite I installed the LED-Matrix library from Henner Zeller which is described in the adafruit tutorial: (https://learn.adafruit.com/adafruit-rgb-matrix-bonnet-for-raspberry-pi)

´´´
curl https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/rgb-matrix.sh >rgb-matrix.sh
sudo bash rgb-matrix.sh

After rebooting I installed node.js following this tutorial: https://tutorials-raspberrypi.de/raspberry-pi-nodejs-webserver-installieren-gpios-steuern/

´´´
sudo apt-get update
sudo apt-get full-upgrade
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

The next steps are optional, I installed git following this article: https://www.raspberry-pi-geek.de/ausgaben/rpg/2019/04/quellcode-managen-mit-git-und-dem-raspberry-pi/ and configured my Raspberry to remote code using Visual Studio Code (https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/).

I also wanted to use typescript, so I setup my project for this: https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript-de

## Running the prototype

After wiring up your LED-Matrix and installing the prerequisites described above you should simple build an run this prototype using

```
git clone https://github.com/jwpriv/ledmatrix-srv.git
npm run build
sudo node dist/app.js

This will start a simple Express.js web service which will listen at Port 3000 to a POST to /clear for clearing the matrix and POST to /pixel using my Pixel Type for setting on Pixel to a certain color.
You can run node without the sudo keyword, but the library needs superuser access to do some hardware magic to improve the output stability.

More will come soon...