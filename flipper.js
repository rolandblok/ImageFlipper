




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

        // create all flip images:
        this.flip_images = new Array()

        // quarters
        for (let k = 0; k < 2; k ++) {
            for (let l = 0; l < 2; l ++) {
                for (let i = 0; i < 2; i ++){
                    for (let j = 0; j < 2; j ++) {
                        let quar = new FlipperImage(2,2)
                        if (k == 1) { quar.setPix(0, 0, true)}
                        if (l == 1) { quar.setPix(0, 1, true)}
                        if (i == 1) { quar.setPix(1, 0, true)}
                        if (j == 1) { quar.setPix(1, 1, true)}
                        this.flip_images.push(quar)
                    }
                }
            }
        }

        this.active_flip_image = Math.floor(this.flip_images.length*Math.random())
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.lineWidth = 0
        this.ctx.fillStyle = '#111111';
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
        this.ctx.stroke()

        // this.ctx.fillStyle = '#aaaaaa';
        // this.ctx.fillRect(this.x + this.edge_width, this.y + this.edge_width, this.flip_w, this.flip_h )
        // this.ctx.stroke()

        this.flip_images[this.active_flip_image].draw(this.ctx, this.x + this.edge_width, this.y + this.edge_width, this.flip_w, this.flip_h )

    }

}

