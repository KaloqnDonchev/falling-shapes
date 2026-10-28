import { Application } from "pixi.js"

(async () => {
    const app = new Application();
    
    await app.init({ background: 'white', resolution: window.devicePixelRatio || 1, autoDensity: true });
    
    const container = document.getElementById("container");
    if (!container) {
        throw new Error('Container element not found');
    }
    
    container.appendChild(app.canvas);
})();