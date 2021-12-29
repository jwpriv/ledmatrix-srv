import { Color } from "rpi-led-matrix";

export function hexToColor(hex: string): Color | null {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(result){
        var r= parseInt(result[1], 16);
        var g= parseInt(result[2], 16);
        var b= parseInt(result[3], 16);
        
        let color: Color = { r, g ,b };
        return color;
    } 

    return null;
  }