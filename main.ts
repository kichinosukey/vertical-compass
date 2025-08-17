/**
 * 垂直に持ったmicro:bitで方角を判定する拡張
 */



//% weight=100 color=#0fbc11 icon="🧭"
namespace VerticalCompass {
    /**
     * XとZの地磁気から方角（0:東, 1:北, 2:西, 3:南）を返す
     */
    //% block
    function getDirection(magX: number, magZ: number): number {
        let angle = getVAngle(magX, magZ)
        let dir = 0
        if (angle < 45 || angle >= 315) {
            dir = 0
        } else if (angle < 135) {
            dir = 1
        } else if (angle < 225) {
            dir = 2
        } else {
            dir = 3
        }
        return dir
    }

    /**
     * XとZの地磁気から角度（0〜359度）を返す
     */
    //% block
    function getVAngle(magX: number, magZ: number): number {
        let angle = Math.atan2(magZ, magX) * 180 / Math.PI
        if (angle < 0) {
            angle += 360
        }
        return Math.round(angle)
    }

    // 北基準(N=0°, CW)の角度から方角を表示
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
        basic.showString(letter)
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

    export function mag2Angle(mag01: number, mag02: number) {
        let angle = Math.atan2(input.magneticForce(Dimension.Z), input.magneticForce(Dimension.X)) * 180 / Math.PI
        if (angle < 0) {
            angle += 360
        }
        return toCompassLikeWithSense(angle)
    }
}