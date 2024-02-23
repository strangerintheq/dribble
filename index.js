import {
    Scene, Object3D
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {Track} from "./Track.js";
import {Puck} from "./Puck.js";
import {Cone} from "./Cone.js";
import {Gate} from "./Gate.js";
import {Magnet} from "./Magnet.js";

import {GameState} from "./GameState.js";
import {Controls} from "./Controls.js";
import {Renderer} from "./Renderer.js";

const track = new Track();
const puck = new Puck();
const gameObjects = new Object3D();
const objects = [
    i => new Gate(i),
    i => new Cone(i),
    i => new Magnet(i)
];
for (let i = 0; i < 200; i++) {
    gameObjects.add(objects[Math.floor(Math.random()*objects.length)](i));
}

const scene = new Scene();
scene.add(track);
scene.add(puck);
scene.add(gameObjects);

const renderer = new Renderer();
const gameState = new GameState(gameObjects, puck);
const controls = new Controls(gameState);

let dt, prevFrameTime = 0;

function calcTime(t) {
    t = t / 1000;
    dt = t - prevFrameTime;
    prevFrameTime = t;
}

requestAnimationFrame(function render(t) {

    calcTime(t);

    if (gameState.gameActive) {
        gameState.movePuck(dt);
        gameState.checkWallCollision();
    }
    gameObjects.children.forEach(o => {
        o.check(gameState);
        o.animate(dt);
    });
    renderer.resize();
    renderer.moveCamera(puck.position);
    renderer.render(scene);

    requestAnimationFrame(render);

});



