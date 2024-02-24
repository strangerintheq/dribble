import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {settings} from "../Settings.js";

const r = settings.puckRadius;

export class Puck extends Mesh {

    constructor() {
        super(new CylinderGeometry(r, r, 0.1, 32), new MeshBasicMaterial({
            color: "#000000"
        }));
        this.rotation.x = Math.PI / 2;
    }

    reset() {
        this.position.set(0, 0, 0)
    }

    tick(state, dt) {
        this.position.copy(state.puckPosition)
    }

}