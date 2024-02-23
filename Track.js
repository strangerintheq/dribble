import {
    RepeatWrapping,
    Mesh,
    CanvasTexture,
    PlaneGeometry,
    MeshBasicMaterial,
    Vector2
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {gameSettings} from "./GameSettings.js";

const trackTexture = makeTrackTexture();

export class Track extends Mesh {
    constructor() {
        super(new PlaneGeometry(gameSettings.trackWidth, gameSettings.trackLength), new MeshBasicMaterial({
            color: "#eeeeee",
            map: trackTexture
        }));
        this.position.y = gameSettings.trackLength * 0.495
    }
}

function makeTrackImage() {
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "red"
    ctx.strokeRect(0, 0, size, 1);
    return canvas;
}

function makeTrackTexture() {
    const tex = new CanvasTexture(makeTrackImage());
    tex.repeat = new Vector2(1, gameSettings.trackLength / gameSettings.trackWidth);
    tex.wrapS = RepeatWrapping;
    tex.wrapT = RepeatWrapping;
    return tex;
}