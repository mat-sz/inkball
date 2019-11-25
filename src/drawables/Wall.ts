import Matter from 'matter-js';
import { Drawable, Color } from '../Types';
import box from '../img/box.png';
import box_gold from '../img/box_gold.png';
import { boxWidth } from '../constants';

const imageGrey = new Image();
imageGrey.src = box;

const imageGold = new Image();
imageGold.src = box_gold;

/**
 * Creates a new Drawable containing a wall block.
 * @param x 
 * @param y 
 * @param width 
 * @param height 
 */
export default function Wall(x: number, y: number, color: Color): Drawable {
    const body = Matter.Bodies.rectangle(x + boxWidth / 2, y + boxWidth / 2, boxWidth, boxWidth, { mass: Infinity, inertia: Infinity });
    
    body.isStatic = true;
    body.restitution = 1;
    
    let image = imageGrey;
    switch (color) {
        case Color.GOLD:
            image = imageGold;
            break;
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "#3c3c45";
        if (image.complete && image.naturalHeight > 0) {
            const pattern = ctx.createPattern(image, 'repeat');
            ctx.fillStyle = pattern;
        }
        ctx.fillRect(body.position.x - boxWidth / 2, body.position.y - boxWidth / 2, boxWidth, boxWidth);
    }

    return {
        body,
        draw,
        color,
    };
}