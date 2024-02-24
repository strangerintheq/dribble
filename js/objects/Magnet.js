import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {settings} from "../Settings.js";
import {GameState} from "../State.js";

const height = 0.05;
const r = settings.magnetRadius;
const coneGeometry = new CylinderGeometry(r, r, height, 32);
const coneMaterial = new MeshBasicMaterial({color: "#00ff00"});
const max = settings.puckRadius + r;

export class Magnet extends Mesh {

    index;

    constructor(index) {
        super(coneGeometry, coneMaterial);
        this.index = index;
        this.rotation.x = Math.PI / 2;
    }

    reset() {
        const x = Math.sign(Math.random() - 0.5) * settings.trackWidth/2;
        this.position.set(x, this.index * 2 + 2, 0);
    }

    tick(state, dt) {
        if (state.gameState !== GameState.RUNNING)
            return
        if (this.position.distanceTo(state.puckPosition) < max) {
            state.gameOver();

        }
    }
}