import bg from '../img/bg.png';
import { Drawable, GameState } from '../Types';

let ctx: CanvasRenderingContext2D, state: GameState;
let canvasWidth: number, canvasHeight: number;

const bgImage = new Image();
bgImage.src = bg;

const draw = () => {
    if (bgImage.complete && bgImage.naturalHeight > 0) {
        const pattern = ctx.createPattern(bgImage, 'repeat');
        ctx.fillStyle = pattern;
    } else {
        ctx.fillStyle = '#898995';
    }

    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let object of [...state.walls, ...state.balls, ...state.lines.reduce((previous, line) => [...previous, ...line]), ...state.goals]) {
        object.draw(ctx);
    }

    requestAnimationFrame(draw);
};

export default function beginDrawing(_ctx: CanvasRenderingContext2D,
    _state: GameState,
    _canvasWidth: number,
    _canvasHeight: number) {

    ctx = _ctx;
    state = _state;
    canvasWidth = _canvasWidth;
    canvasHeight = _canvasHeight;

    requestAnimationFrame(draw);
}