import Matter from 'matter-js';
import "./App.scss";

import LineSegment from './drawables/LineSegment';

import prepareMap from './functions/prepareMap';
import enableInput from './functions/enableInput';
import beginDrawing from './functions/beginDrawing';
import detectCollisions from './functions/detectCollisions';

import firstMap from './maps/first';
import winMap from './maps/win';

import { GameState } from './Types';

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

const reset = (map: number[][]) => {
    Matter.World.clear(world, false);
    gameState.walls = [];
    gameState.goals = [];
    gameState.balls = [];
    gameState.lines = [[]];
    prepareMap(map, world, gameState);
}

reset(firstMap);

document.getElementById("reset").addEventListener("click", () => reset(firstMap));

engine.world.gravity.x = 0;
engine.world.gravity.y = 0;
Matter.Runner.run(runner, engine);

beginDrawing(ctx, gameState, canvas.width, canvas.height);

detectCollisions(engine, gameState, () => {
    reset(winMap);
});

enableInput(canvas, (line) => {
    const segment = line[line.length - 1];
    const lineSegment = LineSegment(segment.x1, segment.y1, segment.x2, segment.y2);
    gameState.lines[gameState.lines.length-1].push(lineSegment);

    Matter.World.add(world, lineSegment.body);
}, (line) => {
    const segment = line[line.length - 1];
    const lineSegment = LineSegment(segment.x1, segment.y1, segment.x2, segment.y2);
    gameState.lines[gameState.lines.length-1].push(lineSegment);
    gameState.lines.push([]);
    
    Matter.World.add(world, lineSegment.body);
});