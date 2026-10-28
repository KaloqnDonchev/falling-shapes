import { Application } from "pixi.js"
import { Shape } from './classes/Shape';

(async () => {
    const GRAVITY = 200;

    const app = new Application();
    
    await app.init({ background: 'white', resolution: window.devicePixelRatio || 1, autoDensity: true });
    
    const container = document.getElementById("container");
    if (!container) {
        throw new Error('Container element not found');
    }
    
    container.appendChild(app.canvas);

    const radius = 30;
    const x = Math.random() * 800;
    const shape = new Shape(x, -radius); // minus to spawn above canvas

    app.stage.addChild(shape.view);

    app.ticker.add((ticker) => {
        shape.update(ticker.deltaMS, GRAVITY);
    });
})();