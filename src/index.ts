import Matter from 'matter-js';
import "./App.scss";

import LineSegment from './drawables/LineSegment';

import prepareMap from './functions/prepareMap';
import enableInput from './functions/enableInput';
import beginDrawing from './functions/beginDrawing';
import detectCollisions from './functions/detectCollisions';
import maps from './maps';

import { GameState, Segment } from './Types';

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const engine = Matter.Engine.create();
const runner = Matter.Runner.create({});
const world = engine.world;
const gameState: GameState = {
    walls: [],
    goals: [],
    balls: [],
    lines: [[]],
};

let currentMapIndex = 0;
const reset = (map: number[][]) => {
    Matter.World.clear(world, false);
    gameState.walls = [];
    gameState.goals = [];
    gameState.balls = [];
    gameState.lines = [[]];
    prepareMap(map, world, gameState);
}

reset(maps[currentMapIndex]);

document.getElementById("reset-game").addEventListener("click", () => {
    currentMapIndex = 0;
    reset(maps[currentMapIndex]);
});
document.getElementById("reset-level").addEventListener("click", () => reset(maps[currentMapIndex]));

engine.world.gravity.x = 0;
engine.world.gravity.y = 0;
Matter.Runner.run(runner, engine);

beginDrawing(ctx, gameState, canvas.width, canvas.height);

detectCollisions(engine, gameState,
() => {
    // Victory!
    if (currentMapIndex !== maps.length - 1) currentMapIndex++;
    reset(maps[currentMapIndex]);
},
() => {
    // Defeat :c
    reset(maps[currentMapIndex]);
},
() => {
    cancelDrawing();
});

const pushSegment = (segment: Segment) => {
    const lineSegment = LineSegment(segment.x1, segment.y1, segment.x2, segment.y2);
    if (lineSegment) {
        gameState.lines[gameState.lines.length-1].push(lineSegment);
        Matter.World.add(world, lineSegment.body);
    }
}

const cancelDrawing = enableInput(canvas, (line) => {
    pushSegment(line[line.length - 1]);
}, (line) => {
    pushSegment(line[line.length - 1]);
    
    gameState.lines.push([]);
});

document.addEventListener('gesturestart', (e) => {
    // Disable zoom on mobile Safari.
    e.preventDefault();
});