import PIXI from 'pixi.js'

//setup Pixi renderer
var renderer = PIXI.autoDetectRenderer(600, 400, {
  backgroundColor: 0x000000
});
document.body.appendChild(renderer.view);

// create new stage
var stage = new PIXI.Container();

let bg = [];

for(let i =0 ;i<10;i++){
  bg[i] = new PIXI.Graphics();
  // Rectangle
  bg[i].beginFill(0xDE3249);
  bg[i].drawRect(10+42*i, 200, 40, 40);
  bg[i].endFill();
  bg[i].buttonMode = true;
  bg[i].alpha = 0.5;
  stage.addChild(bg[i]);
  
  bg[i].interactive = true;
  // make circle non-transparent when mouse is over it
  bg[i].pointerdown = function(mouseData) {
    this.alpha = 1;
  }

  // make circle half-transparent when mouse leaves
  bg[i].pointerup = function(mouseData) {
    this.alpha = 0.5;
  }
}
console.log(bg);



// start animating
animate();

function animate() {
  requestAnimationFrame(animate);
  // render the root container
  renderer.render(stage);
};