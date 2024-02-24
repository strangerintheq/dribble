
import {State} from "./State.js";
import {Controls} from "./Controls.js";
import {Renderer} from "./Renderer.js";
import {Scene} from "./Scene.js";

const scene = new Scene();
const renderer = new Renderer();
const gameState = new State();
const controls = new Controls(gameState);
controls.onSwipe = gameState.changeDirection;
controls.onClick = resetGame;

let dt, prevFrameTime = 0;

function calcTime(t) {
    t = t / 1000;
    dt = t - prevFrameTime;
    prevFrameTime = t;
}

requestAnimationFrame(function render(t) {

    calcTime(t);

    gameState.tick(dt);
    scene.tick(gameState, dt);

    renderer.resize();
    renderer.moveCamera(gameState.puckPosition);
    renderer.render(scene);

    requestAnimationFrame(render);

});

function resetGame() {
    if (gameState.gameActive)
        return;
    gameState.reset();
    scene.reset();
}
