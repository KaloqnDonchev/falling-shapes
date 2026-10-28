import { Application } from "pixi.js"
import { Shape } from './classes/Shape';
import { EllipseGeometry } from "./classes/EllipseGeometry";
import { PolygonGeometry } from "./classes/PolygonGeometry";
import { CANVAS_WIDTH, CANVAS_HEIGHT, MIN_SHAPE_SIZE, MAX_SHAPE_SIZE } from "./constants";

(async () => {
    const GRAVITY = 200;
    const shapeSize = Math.random() * (MAX_SHAPE_SIZE - MIN_SHAPE_SIZE) + MIN_SHAPE_SIZE;
    const x = Math.random() * CANVAS_WIDTH - shapeSize;

    const app = new Application();
    
    await app.init({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, background: 'white', resolution: window.devicePixelRatio || 1, autoDensity: true });
    
    const container = document.getElementById("container");
    if (!container) {
        throw new Error('Container element not found');
    }
    
    container.appendChild(app.canvas);

    const shape = new Shape(x, -shapeSize, new PolygonGeometry([-200, -200 , 200, 200, -200, 200]), 505050); // minus to spawn above canvas

    app.stage.addChild(shape.view);

    app.ticker.add((ticker) => {
        shape.update(ticker.deltaMS, GRAVITY);
    });
})();