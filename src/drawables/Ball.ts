import Matter from 'matter-js';
import { Drawable, Color } from '../Types';
import ball_red from '../img/ball_red.png';
import ball_blue from '../img/ball_blue.png';

const radius = 15;

const imageRed = new Image();
imageRed.src = ball_red;

const imageBlue = new Image();
imageBlue.src = ball_blue;

/**
 * Creates a new Drawable containing a ball.
 * @param x 
 * @param y 
 * @param radius 
 */
export default function Ball(x: number, y: number, color: Color): Drawable {
    const body = Matter.Bodies.circle(x, y, radius, { inertia: Infinity, mass: 1 });

    body.restitution = 1;
    body.friction = 0;
    body.frictionAir = 0;
    body.frictionStatic = 1;
    body.force = {x: 0.01, y: 0.01};
        
    let image: HTMLImageElement = null;
    body.collisionFilter.group = color;
    switch (color) {
        case Color.RED:
            body.collisionFilter.mask = 0b0011;
            image = imageRed;
            break;
        case Color.BLUE:
            body.collisionFilter.mask = 0b0101;
            image = imageBlue;
            break;
    }

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
        color,
    };
}