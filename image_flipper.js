var glb = {}
glb.x = 1 // example


var canvas = document.getElementById("canvas");
window.addEventListener("resize", this.resize, false);
canvas.width = 640;
canvas.height =640;
var ctx = canvas.getContext("2d");
ctx.fillStyle = '#222200';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var canvas_flipper = document.getElementById("canvas_flipper");
canvas_flipper.width = 640;
canvas_flipper.height =640;
var ctx_flipper = canvas_flipper.getContext("2d");



var mouse_down = false
canvas.onmousedown= function(e) {
  mouse_down = true
}
canvas.onmouseup = function(e) {
  mouse_down = false
}

canvas.onmousemove = function(event){
  if (mouse_down) {

      console.log("mvoe")
      let bound = canvas.getBoundingClientRect();

      let x = event.clientX - bound.left - canvas.clientLeft;
      let y = event.clientY - bound.top - canvas.clientTop;
      ctx.fillStyle = '#FFFFFF';

      // ctx.fillRect(x, y, 16, 16);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, 2*Math.PI);
      ctx.fill();
  }
}

edge = 10
no_flippers_x = 10
no_flippers_y = 10
flip_edge  = 5
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

function draw(ctx_flipper, d_time_ms) {

  // draw background
  ctx_flipper.fillStyle = '#777700';
  ctx_flipper.fillRect(0, 0, canvas.width, canvas.height);

  //ctx_flipper.drawImage(canvas, 0, 0)


  // draw walking test square
  ctx_flipper.fillStyle = '#00FF00';
  ctx_flipper.fillRect(stand, 0, 4, 4);
  stand += 1;
  if (stand > canvas.width) stand = 0;

  for (let xfi = 0; xfi < no_flippers_x; xfi++) {
    for (let yfi = 0; yfi < no_flippers_y; yfi++) {
      flippers[xfi][yfi].draw()
    }
  }

  // heartbeat
  ctx_flipper.fillStyle = '#FF00FF';

  let s_w = 0.5 * canvas.width 

  let size =  s_w * (0.25 + 0.15 * Math.sin(0.001*total_draw_time_ms)) 

  ctx_flipper.fillRect(canvas.width/2 - size/2, canvas.height/2 - size/2, size, size);

}



function drawAndUpdate(cur_time) {
  d_time_ms = cur_time - last_drw_time

  if (last_fps_time == 0) {
    last_fps_time = cur_time; // first round
    last_drw_time = cur_time;
  }
  if (d_time_ms > 1000) {
    fps = fps_cntr;
    fps_cntr = 1;
    last_fps_time = cur_time;
  } else {
    fps_cntr += 1;
  }

  // draw FPS
  ctx_flipper.fillStyle = '#ffffff';
  ctx_flipper.font = "10px Arial";
  ctx_flipper.fillText("fps : " + fps, 10, 10);

  total_draw_time_ms += d_time_ms
  draw(ctx_flipper, d_time_ms )
  
  last_drw_time = cur_time;
  requestAnimationFrame(drawAndUpdate);
}



resize();

// start the whole thing up
requestAnimationFrame(drawAndUpdate);


    
    