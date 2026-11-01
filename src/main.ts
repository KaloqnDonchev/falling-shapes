import { Application, Container, Graphics } from "pixi.js"
import { ShapeGeneration } from "./classes/ShapeGeneration.ts";
import { Spawner } from "./classes/Spawner.ts";
import { Stats } from "./classes/Stats.ts";
import { Settings } from "./classes/Settings.ts";
import { Controls } from "./classes/Controls.ts";

(async () => {
    const app = new Application();
    
    const container = document.getElementById("container");
    if (!container) {
        throw new Error('Container element not found');
    }

    await app.init({ resizeTo: container, background: 'white', resolution: window.devicePixelRatio || 1, autoDensity: true });
    
    container.appendChild(app.canvas);

    // auto shape generation + onclick
    const layer = new Container(); // holds all shapes
    app.stage.addChild(layer);

    // masking the play area
    const mask = new Graphics();
    app.stage.addChild(mask);
    layer.mask = mask;

    function drawMask(): void {
        mask.clear().rect(0, 0, app.screen.width, app.screen.height).fill(0xffffff);
    }

    drawMask();
    app.renderer.on('resize', drawMask);

    const settings = new Settings();
    new Controls(settings);
    const spawner = new Spawner(layer, new ShapeGeneration(), settings);

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointerdown', (event) => { // so that it works properly on touch
        spawner.spawnAt(event.global.x, event.global.y);
    });

    // stats fields
    const countEl = document.getElementById('stat-count');
    const areaEl = document.getElementById('stat-area');

    if (!countEl || !areaEl) {
        throw new Error('Stats elements not found');
    }

    const stats = new Stats(countEl, areaEl);

    app.ticker.add((ticker) => {
        spawner.update(ticker.deltaMS, app.screen.width, app.screen.height); // ticks every frame
        stats.update(spawner.count, spawner.totalArea);
    });
})();