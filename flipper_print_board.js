
const SIDE_FRONT = "FRONT"
const SIDE_BACK = "BACK"
const SIDE_CONTOUR = "CONTOUR"



let sketch = function (p) {


    p.setup = function () {
        // createCanvas(400,400)
        if (p.type === "SCREEN") {
            canvas = p.createCanvas(400, 400)
        } else if (p.type === "SVG") {
            canvas_SVG = p.createCanvas(1000, 1000, p.SVG)
        }
        // https://github.com/zenozeng/p5.js-svg/
        // https://makeyourownalgorithmicart.blogspot.com/2018/03/creating-svg-with-p5js.html
        // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an

        p.noLoop();

        setup_done = true
    }

    p.draw = function () {
        if (!setup_done) return

        if (p.side === SIDE_FRONT) {
            p.flipper.draw_print_board_front(p)
        } else if (p.side === SIDE_BACK) {
            p.flipper.draw_print_board_back(p)
        } else if (p.side === SIDE_CONTOUR) {
            p.flipper.draw_print_board_contour(p)
        }
    }

    p.save_canvas = function () {
        if (p.type === "SVG") {
            console.log("save")
            p.draw()
            p.save("string")
        }
    }

}

