

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

    }

    draw() {
        this.ctx.beginPath()
        this.ctx.lineWidth = 0
        this.ctx.fillStyle = '#111111';
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
        this.ctx.stroke()

        this.ctx.fillStyle = '#aaaaaa';
        this.ctx.fillRect(this.x + this.edge_width, this.y + this.edge_width, this.flip_w, this.flip_h )
        this.ctx.stroke()

      }

}