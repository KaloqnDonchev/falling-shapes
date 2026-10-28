import { Application } from "pixi.js"
import { Shape } from './classes/Shape';
import { EllipseGeometry } from "./classes/EllipseGeometry";
import { PolygonGeometry } from "./classes/PolygonGeometry";

(async () => {
    const GRAVITY = 200;
    const CANVAS_WIDTH = 800;
    const radius = 30;
    const x = Math.random() * CANVAS_WIDTH - radius;

    const app = new Application();
    
    await app.init({ background: 'white', resolution: window.devicePixelRatio || 1, autoDensity: true });
    
    const container = document.getElementById("container");
    if (!container) {
        throw new Error('Container element not found');
    }
    
    container.appendChild(app.canvas);

    const shape = new Shape(x, -radius, new PolygonGeometry([100, 200 , 200, 200, 70, 60,]), 505050); // minus to spawn above canvas

    app.stage.addChild(shape.view);

    app.ticker.add((ticker) => {
        shape.update(ticker.deltaMS, GRAVITY);
    });
})();