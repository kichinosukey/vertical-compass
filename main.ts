/**
 * 垂直に持ったmicro:bitで方角を判定する拡張
 */
//% weight=100 color=#0fbc11 icon="🧭"
namespace VerticalCompass {
    /**
     * XとZの地磁気から方角（0:東, 1:北, 2:西, 3:南）を返す
     */
    //% block
    export function getDirection(magX: number, magZ: number): number {
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
    export function getVAngle(magX: number, magZ: number): number {
        let angle = Math.atan2(magZ, magX) * 180 / Math.PI
        if (angle < 0) {
            angle += 360
        }
        return Math.round(angle)
    }
}