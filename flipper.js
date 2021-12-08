




class Flipper {
    constructor(ctx_arg, x, y, w, h, edge_width ) {
        this.ctx = ctx_arg
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.edge_width = edge_width
        this.flip_w = w - 2*edge_width
        this.flip_h = h - 2*edge_width

        this.rot_speed = 5 //flipper per second
        this.current_angle = 0

        // create all flip images:
        this.flip_images = new Array()

        // rectangulare quarters
        for (let k = 0; k < 2; k++) {
            for (let l = 0; l < 2; l++) {
                for (let m = 0; m < 2; m++){
                    for (let n = 0; n < 2; n++) {
                        let quar = new FlipperImage(2,2)
                        if (k == 1) { quar.setPix(0, 0, true)}
                        if (l == 1) { quar.setPix(0, 1, true)}
                        if (m == 1) { quar.setPix(1, 0, true)}
                        if (n == 1) { quar.setPix(1, 1, true)}
                        this.flip_images.push(quar)
                    }
                }
            }
        }
    

        // corner quarters
        if(false) {
            for (let k = 0; k < 2; k++) {
                for (let l = 0; l < 2; l++) {
                    for (let m = 0; m < 2; m++){
                        for (let n = 0; n < 2; n++) {
                            let H = 56 // no height pixels
                            let W = 56 // no width pixels
                            let quar = new FlipperImage(H,W)
                            for (let x = 0; x < W; x++) {
                                for (let y = 0; y < H; y++) {
                                    if (k && (x > y) && (y < H*(1-x/W))) {quar.setPix(x,y,true)}
                                    if (l && (x < y) && (y < H*(1-x/W))) {quar.setPix(x,y,true)}
                                    if (m && (x > y) && (y > H*(1-x/W))) {quar.setPix(x,y,true)}
                                    if (n && (x < y) && (y > H*(1-x/W))) {quar.setPix(x,y,true)}
                                }
                            }
                            this.flip_images.push(quar)
                        }
                    }
                }
            }
        }

        this.target_flip_image  = Math.floor(this.flip_images.length*Math.random())
        this.current_flip_image = this.target_flip_image
    }

    
    draw(d_time_ms) {
        // edges
        this.ctx.beginPath()
        this.ctx.lineWidth = 0
        this.ctx.fillStyle = '#111111';
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
        this.ctx.stroke()

        // update the animation angles
        if (this.target_flip_image != this.current_flip_image){
            this.current_angle += this.rot_speed*d_time_ms/1000
            if (this.current_angle >=1) {
                this.current_angle = 0
                this.current_flip_image = this._get_next_flipper(this.current_flip_image)
            }
        }

        // draw the flippers
        if (this.target_flip_image == this.current_flip_image) {  // we arived, just draw the current.
            this.current_angle = 0
            this.flip_images[this.current_flip_image].draw(this.ctx, this.x + this.edge_width, this.y + this.edge_width, 
                                                           this.flip_w, this.flip_h, 0 )
        } else {
            let next_flipper = this._get_next_flipper(this.current_flip_image)
            if (this.current_angle <= 0.5) {
                this.flip_images[next_flipper           ].draw(this.ctx, this.x + this.edge_width, this.y + this.edge_width, this.flip_w, this.flip_h, 0 )
                this.flip_images[this.current_flip_image].draw(this.ctx, this.x + this.edge_width, this.y + this.edge_width, this.flip_w, this.flip_h, this.current_angle )
            } else {
                this.flip_images[this.current_flip_image].draw(this.ctx, this.x + this.edge_width, this.y + this.edge_width, this.flip_w, this.flip_h, 0 )
                this.flip_images[next_flipper           ].draw(this.ctx, this.x + this.edge_width, this.y + this.edge_width, this.flip_w, this.flip_h, this.current_angle )
            }
    
        }

    }

    /**
     * set the best flipper matching given reference image, using own locations
     * @param {} image_data 
     */
    set_best_flipper(ctx) {
        let image_data = ctx.getImageData(this.x + this.edge_width, this.y + this.edge_width, this.flip_w, this.flip_h)
        let best_flipper = 0
        let best_flipper_overlap = 0
        for (let fi = 0; fi < this.flip_images.length; fi ++) {
            let cur_overlap = this.flip_images[fi].determine_overlap(image_data)
            if (cur_overlap > best_flipper_overlap) {
                best_flipper = fi
                best_flipper_overlap = cur_overlap
            }
        }
        this.target_flip_image = best_flipper
    }

    /**
     * test function
     */
    TST_set_next_flipper() {
        this.target_flip_image = this._get_next_flipper(this.target_flip_image)
    }

    /**
     * return the next flipper
     * @param {*} current 
     * @returns 
     */
    _get_next_flipper(current) {
        let next = current + 1
        if (next == this.flip_images.length) {
            next = 0
        }
        return next
    }

}
