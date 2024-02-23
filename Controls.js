export class Controls {
    gameState;

    constructor(gameState) {
        this.gameState = gameState;

        addEventListener("pointerdown", e0 => {
            const listener = e1 => {
                let dx = e1.clientX - e0.clientX;
                if (Math.abs(dx) > 50) {
                    this.onSwipe(Math.sign(dx));
                    removeEventListener("pointermove", listener);
                }
            };
            addEventListener("pointermove", listener);
        });

        addEventListener("click", () => this.onClick());

        document.getElementById('retryButton')
            .addEventListener('click', () => this.onRetryButtonClicked());
    }

    onRetryButtonClicked() {
        this.gameState.reset();
    }

    onSwipe(dir) {
        this.gameState.changeDirection(dir);
    }

    onClick() {
        this.gameState.reset();
    }
}