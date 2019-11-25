import Matter from 'matter-js';
import { Drawable } from '../Types';

/**
 * Creates a new Drawable containing a line segment (rotated rectangle of a set height) from (x1, y1) to (x2, y2).
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 */
export default function LineSegment(x1: number, y1: number, x2: number, y2: number): Drawable {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const height = 10;
    const width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + 1;

    if (width < 2) return null;

    const body = Matter.Bodies.rectangle((x2 + x1)/2, (y2 + y1)/2, width, height, { mass: Infinity, inertia: Infinity });
    Matter.Body.setAngle(body, angle);
    
    body.isStatic = true;
    body.restitution = 1;

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = '#111';
        ctx.save();
        ctx.beginPath();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.fill();
        ctx.restore();
    }

    return {
        body,
        draw,
    };
}