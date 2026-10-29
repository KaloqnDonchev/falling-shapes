# Falling Shapes

A PixiJS (v8) + TypeScript app where random shapes fall inside a rectangular play area. Click empty space to spawn a shape, click a shape to remove it.

## Run

```bash
npm install
npm run dev      # development server
npm run build    # production build
```

## Features

- Shapes spawn above the top edge at a random X, fall with gravity, and are removed once they leave the bottom.
- Random type (triangle, square, pentagon, hexagon, circle, ellipse, star) and random colour, fixed at creation.
- Click on empty canvas to spawn a shape at the pointer, click a shape to delete it.
- Live stats: number of shapes and total surface area (px²).
- HTML controls: +/- for shapes per second (1-10) and gravity (50-600 px/s).
- Shapes are clipped to the play area with a mask.
- Works with mouse and touch, and the canvas resizes with its container.

## Structure

| File | Responsibility |
| --- | --- |
| `Shape.ts` | One falling shape: owns a Pixi `Graphics`, moves it, destroys it. |
| `Geometry.ts` | `Geometry` interface with `CircleGeometry`, `EllipseGeometry`, `PolygonGeometry`. Each draws itself and computes its area. |
| `ShapeGeneration.ts` | Creates shapes with random type, size and colour, and decides the spawn position. |
| `Spawner.ts` | Owns the list of shapes: timed spawning, movement, cleanup, click handling, count and total area. |
| `Settings.ts` | Shared gravity and spawn rate values. |
| `Controls.ts` | The +/- buttons, which change `Settings`. |
| `Stats.ts` | Writes the count and area into the HTML. |

## Design patterns

- **Strategy:** `Shape` receives a `Geometry` and does not know what kind of shape it draws. Adding a new shape means adding a geometry, not changing `Shape`.
- **Factory:** all random creation logic lives in `ShapeGeneration`.
- **Composition over inheritance:** `Shape` has a `Graphics` instead of extending it.
