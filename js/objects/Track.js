import {
    RepeatWrapping,
    Mesh,
    CanvasTexture,
    PlaneGeometry,
    MeshBasicMaterial,
    Vector2
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {settings} from "../Settings.js";

const trackTexture = makeTrackTexture();

export class Track extends Mesh {
    constructor() {
        super(new PlaneGeometry(settings.trackWidth, settings.trackLength), new MeshBasicMaterial({
            color: "#eeeeee",
            map: trackTexture
        }));
        this.position.y = settings.trackLength * 0.495
    }

    tick(gameState, dt){
        const p = gameState.puckPosition;
        const hr = settings.puckRadius / 2;
        const hw = settings.trackWidth / 2;

        if (p.x + hr >= hw) {
            p.x = hw - hr;
            gameState.direction = -Math.abs(gameState.direction);
            gameState.changeScore(settings.trackCollisionScore)
        }

        if (p.x + hw <= hr) {
            p.x = hr - hw;
            gameState.direction = Math.abs(gameState.direction);
            gameState.changeScore(settings.trackCollisionScore)
        }
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
    tex.repeat = new Vector2(1, settings.trackLength / settings.trackWidth);
    tex.wrapS = RepeatWrapping;
    tex.wrapT = RepeatWrapping;
    return tex;
}