/**
 * 垂直に持ったmicro:bitで方角を判定する拡張
 */

//% weight=100 color=#0fbc11 icon="🧭"
namespace VerticalCompass {

    /**
     * 角度から方角を返す
     * microbitを垂直にした（micro maqueenに設置した）とき、microbitのLED面の方角を判定させる
     */
    //% block
    export function showCardinal(deg: number) {
        let letter = ''
        if ((deg >= 345 && deg < 360) || (deg >= 0 && deg < 15)) {
            letter = "S"
        } else if (deg >= 75 && deg < 105) {
            letter = "W"
        } else if (deg >= 165 && deg < 195) {
            letter = "N"
        } else if (deg >= 255 && deg < 285) {
            letter = "E"
        } else {
            letter = "?"
        }
        return letter
    }


    // E=0°, CCW → N=0°, CW へ
    function toCompassLikeWithSense(a: number) {
        a = a % 360
        if (a < 0) {
            a += 360
        }
        return (90 - a + 360) % 360
    }

    /**
     * X/Y/Zいずれか2軸の地磁気から角度（0〜359度）を返す
     */
    //% block
    export function mag2Angle(mag01: number, mag02: number) {
        let angle = Math.atan2(input.magneticForce(Dimension.Z), input.magneticForce(Dimension.X)) * 180 / Math.PI
        if (angle < 0) {
            angle += 360
        }
        return toCompassLikeWithSense(angle)
    }
}