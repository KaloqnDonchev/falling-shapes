import { Application } from "pixi.js"
import { ShapeGeneration } from "./classes/ShapeGeneration";

(async () => {
    const GRAVITY = 200;

    const app = new Application();
    
    const container = document.getElementById("container");
    if (!container) {
        throw new Error('Container element not found');
    }

    await app.init({ resizeTo: container, background: 'white', resolution: window.devicePixelRatio || 1, autoDensity: true });
    
    container.appendChild(app.canvas);
    const createShape = new ShapeGeneration();
    const shape = createShape.createRandom(app.screen.width);

    app.stage.addChild(shape.view);

    app.ticker.add((ticker) => {
        shape.update(ticker.deltaMS, GRAVITY);
    });
})();