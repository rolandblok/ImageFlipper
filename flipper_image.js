

class FlipperImage {
    constructor (W, H) {
        this.back_color =  '#004400';
        this.fore_color = '#FFFFFF';
        this.W = W
        this.H = H
        this.pixels = new Array(W)
        for(let x = 0; x < W; x ++) {
            this.pixels[x] = new Array(H)
            for(let y = 0; y < H; y++){
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
     * @param {*} angle : the relative flipper angle : for top 0 --> 1
     */
    draw(ctx, x, y, W, H, angle) {
        var top_scale = (angle < 0.5) ? (1-2*angle)   : 1  // go from 0-->1 for angles below 0.5
        var bot_scale = (angle > 0.5) ? 2*(angle-0.5) : 1  // go from 0-->1 for angles above 0.5

        let wi = Math.round(W / this.W)  //  pixel width
        let hi = Math.round(H / this.H)  //  pixel height
        //draw the top pixels
        let top_offset = H/2*(1-top_scale)
        let thi = hi*top_scale           // top pixel height
        for(let pixX = 0; pixX < this.W; pixX++) {
            for(let pixY = 0; pixY < this.H/2; pixY++) { // top half
                if (this.pixels[pixX][pixY]) {
                    ctx.fillStyle = this.fore_color
                } else {
                    ctx.fillStyle = this.back_color
                }
                ctx.fillRect(x+pixX*wi, y + top_offset + pixY*thi, wi, thi )
                ctx.stroke()            
            }
        }
        //draw the bottom pixels
        thi = hi*bot_scale           // bottom pixel height
        for(let pixX = 0; pixX < this.W; pixX++) {
            for(let pixY = this.H/2; pixY < this.H; pixY++) { // top half
                if (this.pixels[pixX][pixY]) {
                    ctx.fillStyle = this.fore_color
                } else {
                    ctx.fillStyle = this.back_color
                }
                ctx.fillRect(x+pixX*wi,  y + H/2 + (pixY-this.H/2)*thi, wi, thi )
                ctx.stroke()
                
            }
        }

    }


    /**
     * Get if a pixel value for a pixel x,y in a reference image resolution of W, H
     * @param {*} x relative pixel x
     * @param {*} y 
     * @param {*} W relative image width
     * @param {*} H 
     */
    _get_scaled_pixel(x,y,W,H) {
        // if W,H > xi,yi
        if ((W >= this.W) && (H >= this.H)) {
            let i = Math.floor(x * this.W / W)
            let j = Math.floor(y * this.H / H)
            return(this.pixels[i][j])

        } else {
            console.log("not implemented")
        }
    }

    determine_overlap(image_data) {

        let no_overlapping_pixels = 0
        for(let pixX = 0; pixX < image_data.width; pixX ++) {
            for(let pixY = 0; pixY < image_data.height; pixY++){
                let index = 4*(pixX + pixY*image_data.width)
                //if average of all three colors are above half intensity, we consider it true.
                let im_pix_on = ((image_data.data[index] + image_data.data[index+1] + image_data.data[index+2]) > 3*128)
                if (im_pix_on == this._get_scaled_pixel(pixX, pixY, image_data.width, image_data.height)) {
                    no_overlapping_pixels++
                }
            }
        }        

        return no_overlapping_pixels / (image_data.width * image_data.height)
    }
}

