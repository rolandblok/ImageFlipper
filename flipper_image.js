

class FlipperImage {
    constructor (xi, yi) {
        this.xi = xi
        this.yi = yi
        this.pixels = new Array(xi)
        for(let x = 0; x < xi; x ++) {
            this.pixels[x] = new Array(yi)
            for(let y = 0; y < yi; y++){
                this.pixels[x][y] = false
            }
        }

    }
    setPix(i, j, is_on) {
        this.pixels[i][j] = is_on
    }

    /**
     * Draw to the ctx
     * @param {*} ctx 
     * @param {*} x position on ctx
     * @param {*} y position on ctx
     * @param {*} W widht to scale to on ctx
     * @param {*} H height to scale to on ctx.
     */
    draw(ctx, x, y, W, H) {
        ctx.fillStyle = '#004400';
        ctx.fillRect(x, y, W, H )
        ctx.stroke()
        let wi = W / this.xi
        let hi = H / this.yi
        for(let pixx = 0; pixx < this.xi; pixx ++) {
            for(let pixy = 0; pixx < this.yi; pixx++){
                if (this.pixels[pixx][pixy]) {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(x+pixx*wi, y+pixy*hi, wi, hi )
                    ctx.stroke()
                }
            }
        }        
    }

    determine_overlap(image_data, W, H) {
        image_data.height
        image_data.widht

        return 
    }
}

