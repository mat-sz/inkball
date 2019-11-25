import Matter from 'matter-js';
import { Drawable, Color } from '../Types';
import goal from '../img/goal.png';
import goal_red from '../img/goal_red.png';
import goal_blue from '../img/goal_blue.png';
import goal_gold from '../img/goal_gold.png';
import { boxWidth } from '../constants';

const imageAny = new Image();
imageAny.src = goal;

const imageRed = new Image();
imageRed.src = goal_red;

const imageBlue = new Image();
imageBlue.src = goal_blue;

const imageGold = new Image();
imageGold.src = goal_gold;

/**
 * Creates a new Drawable containing goal block that triggers win conditions.
 * @param x 
 * @param y 
 * @param width 
 * @param height 
 */
export default function Goal(x: number, y: number, color: Color): Drawable {
    const body = Matter.Bodies.rectangle(x + boxWidth / 2, y + boxWidth / 2, boxWidth, boxWidth, { mass: Infinity, inertia: Infinity });

    body.isStatic = true;
    body.restitution = 1;

    let image = imageAny;
    
    switch (color) {
        case Color.RED:
            image = imageRed;
            break;
        case Color.BLUE:
            image = imageBlue;
            break;
        case Color.GOLD:
            image = imageGold;
            break;
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "#dbd97d";

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