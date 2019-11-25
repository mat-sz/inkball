import Matter from 'matter-js';

export interface Drawable {
    draw: (ctx: CanvasRenderingContext2D) => void,
    body: Matter.Body,
};

export interface Segment {
    x1: number,
    x2: number,
    y1: number,
    y2: number,
};

export interface GameState {
    walls: Drawable[],
    goals: Drawable[],
    lines: Drawable[][],
    balls: Drawable[],
};