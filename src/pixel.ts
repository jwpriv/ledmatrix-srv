export interface Position {
    row: number,
    col: number
}

export interface Pixel {
    position: Position,
    brightness: number;
    color: string;
}