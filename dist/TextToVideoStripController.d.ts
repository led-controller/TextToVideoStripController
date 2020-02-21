/// <reference types="node" />
import { IStripController } from "./IStripController";
interface IColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
declare class Led {
    color: IColor;
    constructor(color: IColor);
}
export default class TextToVideoStripController implements IStripController {
    leds: Array<Led>;
    stripSize: number;
    fileStream: NodeJS.WritableStream;
    /**
     * Controller that outputs into a textfile. This file can later be interpretet with a python script.
     * This Controller is just used for local developement
     * @param params Params Array from main Application
     */
    constructor(params: Array<string>);
    all(r: number, g: number, b: number, a: number): void;
    set(led: number, r: number, g: number, b: number, a: number): void;
    sync(): void;
    clear(): void;
    off(): void;
    shutdown(callback: () => void): void;
    getLength(): number;
}
export {};
