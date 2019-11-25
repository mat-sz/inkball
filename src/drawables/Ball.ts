import Matter from 'matter-js';
import { Drawable } from '../Types';
import ball_red from '../img/ball_red.png';

const radius = 15;

const image = new Image();
image.src = ball_red;

/**
 * Creates a new Drawable containing a ball.
 * @param x 
 * @param y 
 * @param radius 
 */
export default function Ball(x: number, y: number): Drawable {
    const body = Matter.Bodies.circle(x, y, radius, { inertia: Infinity });
    
    body.restitution = 1;
    body.friction = 0;
    body.frictionAir = 0;
    body.force = {x: 0.01, y: 0.01};

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (image.complete && image.naturalHeight > 0) {
            ctx.drawImage(image, body.position.x - radius, body.position.y - radius);
        } else {
            ctx.fillStyle = "#ff0000";
            ctx.beginPath();
            ctx.arc(body.position.x, body.position.y, radius, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    }

    return {
        body,
        draw,
    };
}