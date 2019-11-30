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
 * @param color
 * @param width 
 * @param height 
 */
export default function Wall(x: number, y: number, color: Color, width = 1, height = 1): Drawable {
    const totalWidth = boxWidth * width;
    const totalHeight = boxWidth * height;

    const body = Matter.Bodies.rectangle(x + totalWidth / 2, y + totalHeight / 2, totalWidth, totalHeight, { mass: Infinity, inertia: Infinity });
    
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
        ctx.fillRect(body.position.x - totalWidth / 2, body.position.y - totalHeight / 2, totalWidth, totalHeight);
    }

    return {
        body,
        draw,
        color,
    };
}