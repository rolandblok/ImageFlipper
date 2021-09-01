var glb = {}
glb.x = 1 // example


var canvas = document.getElementById("canvas");
window.addEventListener("resize", this.resize, false);
canvas.width  = 640;
canvas.height = 640;
var ctx = canvas.getContext("2d");
var back_color = '#222200';
var fore_color = '#FFFFFF';
ctx.fillStyle = back_color
ctx.fillRect(0, 0, canvas.width, canvas.height);

var canvas_flipper = document.getElementById("canvas_flipper");
canvas_flipper.width  = 640;
canvas_flipper.height = 640;
var ctx_flipper = canvas_flipper.getContext("2d");

window.addEventListener('keydown', function(e){
  console.log("key pressed " + e.key)
  if (e.key == 'r' ){
    ctx.fillStyle = back_color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke()
    for (let xfi = 0; xfi < no_flippers_x; xfi++) {
      for (let yfi = 0; yfi < no_flippers_y; yfi++) {
        flippers[xfi][yfi].set_best_flipper(ctx)
      }
    }    
  }
})

var mouse_down = false
canvas.onmousedown= function(e) {
  mouse_down = true
}
canvas.onmouseup = function(e) {
  mouse_down = false
  console.log("mouse up")
  for (let xfi = 0; xfi < no_flippers_x; xfi++) {
    for (let yfi = 0; yfi < no_flippers_y; yfi++) {
      flippers[xfi][yfi].set_best_flipper(ctx)
    }
  }
}

canvas.onmousemove = function(event){
  if (mouse_down) {

      let bound = canvas.getBoundingClientRect();

      let x = event.clientX - bound.left - canvas.clientLeft;
      let y = event.clientY - bound.top - canvas.clientTop;
      if(event.ctrlKey) {
        ctx.fillStyle = back_color
      } else {
        ctx.fillStyle = fore_color
      }
  
      // ctx.fillRect(x, y, 16, 16);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2*Math.PI);
      ctx.fill();
  }
}

edge = 10
no_flippers_x = 10
no_flippers_y = 10
flip_edge  = 2
flip_w = (canvas.width - 2*edge) / no_flippers_x
flip_h = (canvas.height - 2*edge) / no_flippers_y

flippers = new Array(no_flippers_y)
let xf = edge
let yf = edge
for (let xfi = 0; xfi < no_flippers_x; xfi++) {
  flippers[xfi] = new Array(no_flippers_x)
  for (let yfi = 0; yfi < no_flippers_y; yfi++) {
    flippers[xfi][yfi] = new Flipper(ctx_flipper, xf, yf, flip_w, flip_h, flip_edge)
    yf += flip_h
  }
  yf = edge
  xf += flip_w
}


function resize() {
  // canvas.width  = window.innerWidth;
  // canvas.height = window.innerHeight;
}

this.gui = new dat.GUI();
this.gui.add(glb, "x", 1)


// udpate loop program
var fps = 0;
var fps_cntr = 0;
var last_fps_time = 0;
var last_drw_time = 0;
var total_draw_time_ms = 0;

let stand = 0

function draw_flipper(ctx_flipper, d_time_ms) {

  // draw background
  ctx_flipper.fillStyle = '#777700';
  ctx_flipper.fillRect(0, 0, canvas.width, canvas.height);

  // draw walking test square
  ctx_flipper.fillStyle = '#00FF00';
  ctx_flipper.fillRect(stand, 0, 4, 4);
  stand += 1;
  if (stand > canvas.width) stand = 0;

  // draw the flippers
  for (let xfi = 0; xfi < no_flippers_x; xfi++) {
    for (let yfi = 0; yfi < no_flippers_y; yfi++) {
      flippers[xfi][yfi].draw(d_time_ms)
    }
  }

  // heartbeat
  ctx_flipper.fillStyle = '#FF00FF';

}


function drawAndUpdate(cur_time) {
  d_time_ms = cur_time - last_drw_time

  draw_flipper(ctx_flipper, d_time_ms )
  
  last_drw_time = cur_time;
  requestAnimationFrame(drawAndUpdate);
}



resize();

// start the whole thing up
requestAnimationFrame(drawAndUpdate);


    
    