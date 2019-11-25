import { Segment } from '../Types';

let drawing = false;
let x = 0;
let y = 0;
let onUpdateLine: (line: Segment[]) => void = null;
let onFinishLine: (line: Segment[]) => void = null;

let line: Segment[] = [];

const mouseDown = (e: MouseEvent) => {
    beginDrawing(e.offsetX, e.offsetY);
};

const mouseMove = (e: MouseEvent) => {
    if (!drawing) return;
    draw(e.offsetX, e.offsetY);
};

const mouseUp = (e: MouseEvent) => {
    endDrawing(e.offsetX, e.offsetY);
};

function beginDrawing(_x: number, _y: number) {
    drawing = true;
    x = _x;
    y = _y;
    line = [];
}

function draw(_x: number, _y: number) {
    if (!drawing) return;
    line.push({x1: x, y1: y, x2: _x, y2: _y});
    x = _x;
    y = _y;
    onUpdateLine(line);
}

function endDrawing(_x: number, _y: number) {
    if (!drawing) return;
    drawing = false;
    line.push({x1: x, y1: y, x2: _x, y2: _y});
    onFinishLine(line);
}

function cancelDrawing() {
    if (!drawing) return;
    drawing = false;
    onFinishLine(line);
}

export default function enableInput(canvas: HTMLCanvasElement, _onUpdateLine: (line: Segment[]) => void, _onFinishLine: (line: Segment[]) => void): () => void {
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mouseleave", mouseUp);

    onUpdateLine = _onUpdateLine;
    onFinishLine = _onFinishLine;

    return cancelDrawing;
}