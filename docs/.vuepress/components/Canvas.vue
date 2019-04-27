<template lang="html">
  <div id="game"></div>
</template>

<script>

export default {
  created() {
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
    console.log('123456789');
    console.log('123456789');



    let y = 0;  
    let x = 0;
    let xLength = 10;
    let maxfloor = 80;
    let floorData = new Array(maxfloor);
    for(let i =0 ;i<maxfloor;i++){
      floorData[i] = {
        'id':0,
        'text':0,
        'event':false
      };
    }
    // console.log(floorData);

    // 地雷位置亂數
    let randomArray =[];
    for(let i=0;i<8;i++){
      let number = Math.floor(Math.random()*maxfloor);
      randomArray.push(number);
     }
    console.log(randomArray);


    for(let i =0 ;i<maxfloor;i++){
        x++;  
        if(i % xLength ==0){
            y++;
            x=0;
        }
        
        floorData[i].id = i;
        floorData[i].xSite= 10+42*x;
        floorData[i].ySite= 100+42*y;
        floorData[i].event = randomArray.some(e => e == i);
        floorData[i].block = new PIXI.Graphics();
        // Rectangle
        if(!floorData[i].event){
          // 沒有地雷
          floorData[i].block.beginFill(0xDE3249);          
        }else{
          // 有地雷
          floorData[i].block.beginFill(0x1099bb);
          console.log(floorData[i+1]);

          if(i % xLength == 0 && i < xLength){
            if(i+1 < maxfloor){floorData[i+1].text++};
            if(i+xLength < maxfloor){floorData[i+xLength].text++};
            if(i+xLength+1 < maxfloor ){floorData[i+xLength+1].text++};            
          }else if(i % xLength == 0 && i > maxfloor - xLength){
            if(i+1 < maxfloor){floorData[i+1].text++};
            if(i-xLength >= 0){floorData[i-xLength].text++};
            if(i-xLength+1 >= 0 ){floorData[i-xLength+1].text++};
          }else if(i % xLength == xLength-1 && i < xLength){
            if(i-1 >= 0){floorData[i-1].text++};
            if(i+xLength < maxfloor){floorData[i+xLength].text++};
            if(i+xLength-1 < maxfloor ){floorData[i+xLength-1].text++};          
          }else if(i % xLength == xLength-1 && i > maxfloor - xLength){
            if(i-1 >= 0){floorData[i-1].text++};
            if(i-xLength >= 0){floorData[i-xLength].text++};
            if(i-xLength-1 >= 0 ){floorData[i-xLength-1].text++};
          }else if(i % xLength == 0){
            if(i+1 < maxfloor){floorData[i+1].text++};
            if(i-xLength >= 0){floorData[i-xLength].text++};
            if(i-xLength+1 >= 0 ){floorData[i-xLength+1].text++};
            if(i+xLength < maxfloor){floorData[i+xLength].text++};
            if(i+xLength+1 < maxfloor ){floorData[i+xLength+1].text++};
          }else if(i % xLength == xLength-1){
            if(i-1 >= 0){floorData[i-1].text++};
            if(i-xLength >= 0){floorData[i-xLength].text++};
            if(i-xLength-1 >= 0 ){floorData[i-xLength-1].text++};
            if(i+xLength < maxfloor){floorData[i+xLength].text++};
            if(i+xLength-1 < maxfloor ){floorData[i+xLength-1].text++};
          }else if(i < xLength){
            if(i-1 >= 0){floorData[i-1].text++};
            if(i+1 < maxfloor){floorData[i+1].text++};
            if(i+xLength < maxfloor){floorData[i+xLength].text++};
            if(i+xLength-1 < maxfloor ){floorData[i+xLength-1].text++};
            if(i+xLength+1 < maxfloor ){floorData[i+xLength+1].text++};
          }else if(i > maxfloor - xLength){
            if(i-1 >= 0){floorData[i-1].text++};
            if(i+1 < maxfloor){floorData[i+1].text++};
            if(i-xLength >= 0){floorData[i-xLength].text++};
            if(i-xLength-1 >= 0 ){floorData[i-xLength-1].text++};
            if(i-xLength+1 >= 0 ){floorData[i-xLength+1].text++};
          }else{
            if(i-1 >= 0){floorData[i-1].text++};
            if(i+1 < maxfloor){floorData[i+1].text++};
            if(i-xLength >= 0){floorData[i-xLength].text++};
            if(i-xLength-1 >= 0 ){floorData[i-xLength-1].text++};
            if(i-xLength+1 >= 0 ){floorData[i-xLength+1].text++};
            if(i+xLength < maxfloor){floorData[i+xLength].text++};
            if(i+xLength-1 < maxfloor ){floorData[i+xLength-1].text++};
            if(i+xLength+1 < maxfloor ){floorData[i+xLength+1].text++};
          }


        }
        floorData[i].block.drawRect(floorData[i].xSite, floorData[i].ySite, 40, 40);
        floorData[i].block.endFill();
        floorData[i].block.buttonMode = true;
        floorData[i].block.alpha = 0.5;
        stage.addChild(floorData[i].block);

        floorData[i].block.interactive = true;
        // make circle non-transparent when mouse is over it
        floorData[i].block.pointerdown = function(mouseData) {
            this.alpha = 1;
        }

        // make circle half-transparent when mouse leaves
        floorData[i].block.pointerup = function(mouseData) {
            this.alpha = 0.5;
        }
    }

    floorData.forEach((e,i) =>{
      if(!randomArray.some(e => e == i)){
        e.textBlock = new PIXI.Text(e.text);
        e.textBlock.x = e.xSite;
        e.textBlock.y = e.ySite;
        stage.addChild(e.textBlock);
      }
    });

    console.log(floorData);


    // start animating
    animate();

    function animate() {
    requestAnimationFrame(animate);
    // render the root container
    renderer.render(stage);
    };
  },
}
</script>

<style lang="stylus">

body,html
  padding 0
  margin 0

</style>
