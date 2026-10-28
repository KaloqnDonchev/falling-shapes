import { Application } from "pixi.js"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";
import { ShapeGeneration } from "./classes/ShapeGeneration";

(async () => {
    const GRAVITY = 200;

    const app = new Application();
    
    const container = document.getElementById("container");
    await app.init({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, background: 'white', resolution: window.devicePixelRatio || 1, autoDensity: true });
    
    if (!container) {
        throw new Error('Container element not found');
    }
    
    container.appendChild(app.canvas);

    const createShape = new ShapeGeneration();
    const shape = createShape.createRandom();

    app.stage.addChild(shape.view);

    app.ticker.add((ticker) => {
        shape.update(ticker.deltaMS, GRAVITY);
    });
})();