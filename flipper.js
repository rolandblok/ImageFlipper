

class Flipper {
    constructor(ctx_arg, x, y, w, h, stroke_width ) {
        this.ctx = ctx_arg
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.stroke_width = stroke_width
        this.edge = 1
        this.flip_w = w - 2*stroke_width - 2*this.edge
        this.flip_h = h - 2*stroke_width - 2*this.edge

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