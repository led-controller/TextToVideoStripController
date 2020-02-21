"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class Led {
    constructor(color) {
        this.color = color;
    }
}
class TextToVideoStripController {
    /**
     * Controller that outputs into a textfile. This file can later be interpretet with a python script.
     * This Controller is just used for local developement
     * @param params Params Array from main Application
     */
    constructor(params) {
        this.leds = [];
        this.stripSize = params["ledcount"];
        for (let i = 0; i < this.stripSize; i++) {
            this.leds.push(new Led({ r: 0, g: 0, b: 0, a: 0 }));
        }
        let animationFilePath = params["animationPath"] || "./animation.txt";
        this.fileStream = fs_1.createWriteStream(animationFilePath, { encoding: "UTF8" });
        console.log('TextToVideoStripcontroller initialized');
    }
    all(r, g, b, a) {
        for (let i = 0; i < this.stripSize; i++) {
            this.leds[i] = new Led({ r: r, g: g, b: b, a: a });
        }
    }
    set(led, r, g, b, a) {
        if (led >= 0 && led < this.stripSize) {
            this.leds[led] = new Led({ r: r, g: g, b: b, a: a });
        }
    }
    sync() {
        for (const led of this.leds) {
            this.fileStream.write(`${led.color.r},${led.color.g},${led.color.b},${led.color.a};`);
            /*
            {r,g,b,a}{r,g,b,a}
            */
        }
        this.fileStream.write("\n");
    }
    clear() {
        this.all(0, 0, 0, 0);
    }
    off() {
        // just dont do anythingF
    }
    shutdown(callback) {
        this.fileStream.end(callback);
    }
    getLength() {
        return this.stripSize;
    }
}
exports.default = TextToVideoStripController;
