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

    function getVAngle(magX: number, magZ: number): number {
        let angle2 = Math.atan2(magZ, magX) * 180 / Math.PI
        if (angle2 < 0) {
            angle2 += 360
        }
        return Math.round(angle2)
    }
}
