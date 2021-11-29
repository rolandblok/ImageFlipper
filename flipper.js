

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

    set_board() {
        this.board_W = 1000  // print out board width mm
        this.board_H = 1000  // print out board height mm
        this.board_we = 100   // room to leave op at edge in width
        this.board_wr = 100   // room to leave between flips in width
        this.board_he = 100   // room to leave op at edge in height
        this.board_hr = 100   // room to leave between flips in height
        this.flpr_w = 120    // flipper width mm
        this.flpr_h = 65     // flipper height mm
        this.flpr_nh = 2     // notch height mm
        this.flpr_nw = 1.65  // notch width mm
        this.flpr_no = 1.30  // notch offset from flipper center mm
        this.flpr_border = 5   // top and bottom border mm
        this.flpr_back_color = [255,255,255]  // background and border color
        this.flpr_front_color = [0,0,0]       // front color
        this.no_fl_x = Math.floor((this.board_W - 2*this.board_we + this.board_wr) / 
                                    (this.flpr_w + 2*this.flpr_nw + this.board_wr))
        this.no_fl_y = Math.floor((this.board_H - 2*this.board_he + this.board_hr) / 
                                    (this.flpr_w  + this.board_hr))

    }
    draw_print_board_front(p) {
        // p.
    }
    draw_print_board_back(p) {

    }
    draw_print_board_contour(p) {
        this.set_board()
        p.clear()
        p.stroke(this.flpr_back_color) 
        p.strokeWeight(1)
        p.fill(this.flpr_back_color)
        p.rect(0,0,this.board_W, this.board_H)  // full fill with back ground
        // p.no_fill()
        p.stroke(this.flpr_front_color)

        for(let y_i = 0; y_i < this.no_fl_y; y_i++) {
            for (let x_i = 0; x_i < this.no_fl_x; x_i++) {
                let fl_i = x_i + y_i*this.no_fl_x // flipper index

                if (fl_i < this.flip_images.length) {
                    let X = this.board_we + x_i * (this.flpr_w + 2*this.flpr_nw + this.flpr_wr)
                    let Y = this.board_hr + y_i * (this.flpr_h + this.flpr_hr)

                    p.beginShape()
                    X += this.flpr_nw
                    p.vertex(X,Y)
                    X += this.flpr_w
                    p.vertex(X,Y)
                    Y += this.flpr_h - this.flpr_nh - this.flpr_no
                    p.vertex(X,Y)
                    X += this.flpr_nw
                    p.vertex(X,Y)
                    Y += this.flpr_nh
                    p.vertex(X,Y)
                    X -= this.flpr_nw
                    p.vertex(X,Y)
                    Y += this.flpr_no
                    p.vertex(X,Y)
                    X -= this.flpr_w
                    p.vertex(X,Y)
                    Y -= this.flpr_no
                    p.vertex(X,Y)
                    X -= this.flpr_nw
                    p.vertex(X,Y)
                    Y -= this.flpr_nh
                    p.vertex(X,Y)
                    X += this.flpr_nw
                    p.vertex(X,Y)
                    Y -= this.flpr_h - this.flpr_nh - this.flpr_no
                    p.vertex(X,Y)
                    
                    p.endShape()

                }
            }
        }
    }
    // draw one conto
    draw_print_flip_contour(p, X, Y) {

    }


}

