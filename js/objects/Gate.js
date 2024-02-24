import {
    Mesh,
    BoxGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";
import {settings} from "../Settings.js";

const width = settings.gateWidth;
const height = settings.gateHeight;

const coneGeometry = new BoxGeometry(width, 0.05, height, 32);
const coneMaterial = new MeshBasicMaterial({color: "#0000ff"});
const max = settings.puckRadius + width / 2;

export class Gate extends Mesh {

    static width = width;

    passed;
    index;

    constructor(index) {
        super(coneGeometry, coneMaterial);
        this.index = index;
    }

    reset() {
        this.passed = false;
        this.position.set(
            (Math.random() - 0.5) * (settings.trackWidth - width),
            this.index * 2 + 2.5,
            0
        );
    }

    tick(state, dt) {
        if (this.passed) {
            this.position.z = Math.max(-0.1, this.position.z - 0.01);
        } else if (this.position.distanceTo(state.puckPosition) < max) {
            state.changeScore(10);
            this.passed = true;
        }
    }
}