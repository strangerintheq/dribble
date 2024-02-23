import {
    RepeatWrapping,
    Mesh,
    CanvasTexture,
    PlaneGeometry,
    MeshBasicMaterial,
    Vector2
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

const trackTexture = makeTrackTexture();

export class Track extends Mesh {

    static width = 3;
    static length = 300;

    constructor() {
        super(new PlaneGeometry(Track.width, Track.length), new MeshBasicMaterial({
            color: "#eeeeee",
            map: trackTexture
        }));
        this.position.y = Track.length * 0.495
    }
}

function makeTrackImage() {
    const canvas = document.createElement('canvas');
    const size = 512;
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
    tex.repeat = new Vector2(1, 100);
    tex.wrapS = RepeatWrapping;
    tex.wrapT = RepeatWrapping;
    return tex;
}