

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
        this.ctx.lineWidth = stroke_width
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.rect(this.x+this.edge, this.y+this.edge, this.w-this.stroke_width, this.h-this.stroke_width)
        this.ctx.stroke()

        this.ctx.fillStyle = '#222222';
        this.ctx.fillRect(this.x + this.edge, this.y + this.edge, this.flip_w, this.flip_h )


      }
}