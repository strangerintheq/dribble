import {
    Scene as ThreeScene
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {Track} from "./objects/Track.js";
import {Puck} from "./objects/Puck.js";
import {Cone} from "./objects/Cone.js";
import {Gate} from "./objects/Gate.js";
import {Magnet} from "./objects/Magnet.js";


const objects = [
    i => new Gate(i),
    i => new Cone(i),
    i => new Magnet(i)
];

export class Scene extends ThreeScene {

    constructor() {
        super();

        this.add(new Track());
        this.add(new Puck());

        for (let i = 0; i < 200; i++) {
            const randomIndex = Math.floor(Math.random()*objects.length);
            this.add(objects[randomIndex](i));
        }
    }

    tick(state, dt) {
        this.children.forEach(o => o.tick && o.tick(state, dt))
    }

    reset() {
        this.children.forEach(o => o.reset && o.reset())
    }

}