import Matter from 'matter-js';
import { Drawable } from '../Types';
import box from '../img/box.png';

const width = 40;
const height = 40;

const image = new Image();
image.src = box;

/**
 * Creates a new Drawable containing a wall block.
 * @param x 
 * @param y 
 * @param width 
 * @param height 
 */
export default function Wall(x: number, y: number): Drawable {
    const body = Matter.Bodies.rectangle(x + width / 2, y + height / 2, width, height, { mass: Infinity, inertia: Infinity });
    
    body.isStatic = true;
    body.restitution = 1;

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "#3c3c45";
        if (image.complete && image.naturalHeight > 0) {
            const pattern = ctx.createPattern(image, 'repeat');
            ctx.fillStyle = pattern;
        }
        ctx.fillRect(body.position.x - width / 2, body.position.y - height / 2, width, height);
    }

    return {
        body,
        draw,
    };
}