import { IStripController } from "./IStripController";
import {createWriteStream, existsSync, statSync, Stats } from "fs";

interface IColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

class Led {
    color: IColor;

    constructor(color: IColor) {
        this.color = color;
    }
}

export default class TextToVideoStripController implements IStripController {
  
  leds: Array<Led> = [];
  stripSize: number;
  fileStream: NodeJS.WritableStream;

  /**
   * Controller that outputs into a textfile. This file can later be interpretet with a python script.
   * This Controller is just used for local developement
   * @param params Params Array from main Application
   */
  constructor(params: Array<string>) {
    this.stripSize = params["ledcount"];

    for(let i: number = 0; i < this.stripSize; i++) {
      this.leds.push(new Led({r: 0, g: 0, b: 0, a: 0}));
    }

    let animationFilePath = params["animout"] || "./animation.txt";
    this.fileStream = createWriteStream(animationFilePath, {encoding: "UTF8"});
    console.log('TextToVideoStripcontroller initialized');  
  }

  all(r: number, g: number, b: number, a: number): void {
    for(let i: number = 0; i < this.stripSize; i++) {
      this.leds[i] = new Led({r: r, g: g, b: b, a: a});
    }
  }
  set(led: number, r: number, g: number, b: number, a: number): void {
    if (led >= 0 && led < this.stripSize) {
      this.leds[led] = new Led({r: r, g: g, b: b, a: a});
    }
  }
  sync(): void {
    for (const led of this.leds) {
      this.fileStream.write(`${led.color.r},${led.color.g},${led.color.b},${led.color.a};`);
      /*
      {r,g,b,a}{r,g,b,a}
      */
    }
    this.fileStream.write("\n");
  }
  clear(): void {
    this.all(0, 0, 0, 0);
  }
  off(): void {
    // just dont do anythingF
  }
  shutdown(callback : () => void): void {
    this.fileStream.end(callback);
  }

  getLength(): number {
    return this.stripSize;
  }
}