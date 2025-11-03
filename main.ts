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
        if (deg >= 0 && deg < 23 || deg >= 338 && deg < 360) {
            letter = "S"
        } else if (deg >= 67 && deg < 113) {
            letter = "W"
        } else if (deg >= 157 && deg < 203) {
            letter = "N"
        } else if (deg >= 247 && deg < 292) {
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