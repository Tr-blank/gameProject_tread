window.onload = function() {

    //setup Pixi renderer
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight-3, {
        backgroundColor: 0xeeeeee
    });
    document.body.appendChild(renderer.view);

    // create new stage
    var stage = new PIXI.Container();

    // create helpful message
    var style = {
        font: '18px Courier, monospace',
        fill: '#333333'
    };
    var message = new PIXI.Text('Hover your mouse over the circle to see the effect.', style);
    message.x = 10;
    message.y = 10;
    stage.addChild(message);



    let floorData = [];
    let y = 0;  
    let x = 0;
    for(let i =0 ;i<50;i++){
        x++;  
        if(i % 10 ==0){
            y++;
            x=0;
        } 
        floorData.block = new PIXI.Graphics();
        // Rectangle
        floorData.block.beginFill(0xDE3249);
        floorData.block.drawRect(10+42*x, 100+42*y, 40, 40);
        floorData.block.endFill();
        floorData.block.buttonMode = true;
        floorData.block.alpha = 0.5;
        stage.addChild(floorData.block);

        floorData.block.interactive = true;
        // make circle non-transparent when mouse is over it
        floorData.block.pointerdown = function(mouseData) {
            this.alpha = 1;
        }

        // make circle half-transparent when mouse leaves
        floorData.block.pointerup = function(mouseData) {
            this.alpha = 0.5;
        }
    }
    console.log(floorData);


    // start animating
    animate();

    function animate() {
    requestAnimationFrame(animate);
    // render the root container
    renderer.render(stage);
    };
};
