
import {GameState, State} from "./State.js";
import {Controls} from "./Controls.js";
import {Renderer} from "./Renderer.js";
import {Scene} from "./Scene.js";

const scene = new Scene();
const renderer = new Renderer();
const state = new State();
const controls = new Controls(state);
controls.onSwipe = dir => handleSwipe(dir);
controls.onClick = () => handleClick();

let dt, prevFrameTime = 0;

function calcTime(t) {
    t = t / 1000;
    dt = t - prevFrameTime;
    prevFrameTime = t;
}

scene.reset();
state.reset();

requestAnimationFrame(function render(t) {

    calcTime(t);

    state.tick(dt);
    scene.tick(state, dt);

    renderer.resize();
    renderer.moveCamera(state.puckPosition);
    renderer.render(scene);

    requestAnimationFrame(render);

});

function handleClick() {
    if (state.gameState !== GameState.OVER)
        return;
    state.reset();
    scene.reset();
}

function handleSwipe(dir){
    if (state.gameState === GameState.NOT_STARTED) {
        state.start(dir)
    } else {
        state.changeDirection(dir);
    }
}
