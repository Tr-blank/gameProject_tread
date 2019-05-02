<template lang="html">
  <div id="game"></div>
</template>

<script>


    let floorCheckList = []
    let safeArea = []
    let floorData  = []
    let maxfloor  =  80
    let xLength = 10
    let safeFloors = []

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




    let y = 0;  
    let x = 0;
    floorData = new Array(maxfloor);
    // 初始化地圖資訊
    for(let i =0 ;i<maxfloor;i++){
      floorData[i] = {
        'id':0,
        'text':0,
        'event':false,
        'safeAreaID':0 
      };
    }
    // console.log(floorData);

    // 產生亂數地雷位置
    let randomArray =[];
    for(let i=0;i<10;i++){
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


        // 長方形

        if(!floorData[i].event){
          // 沒有地雷
          floorData[i].block.beginFill(0xDE3249);  
        }else{
          // 有地雷
          floorData[i].block.beginFill(0x1099bb);
          // console.log(floorData[i+1]);
          // 地雷周邊地區提示數字＋１
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
            console.log(i)
            console.log(floorData[i])
            this.clear();   
            // this.beginFill(0xFF0000);
            // this.drawRect(floorData[i].xSite, floorData[i].ySite, 40, 40);
            // this.endFill();
            // sthis.tage.addChild(this);
            renderer.render(stage);

            // changeColor()
            if(floorData[i].text == 0){
              console.log(floorData[i].text)
              checkRound(i)
            }
        }

        // make circle half-transparent when mouse leaves
        floorData[i].block.pointerup = function(mouseData) {
            alpha = 0.5;
        }
    }

    floorData.forEach((e,i) =>{
      if(e.text == 0 && !e.event){safeFloors.push(i)}
      if(!randomArray.some(e => e == i)){
        e.textBlock = new PIXI.Text(e.text);
        e.textBlock.x = e.xSite;
        e.textBlock.y = e.ySite;
        stage.addChild(e.textBlock);
      }
    });
    console.log(safeFloors)//安全的地板
    console.log(floorData);

    // checkRound(safeFloors[0])

    // floorCheckList.forEach(e => {
    //   checkRound(e)
    // })


    // start animating
    animate();

    function animate() {
      requestAnimationFrame(animate);
      // render the root container
      renderer.render(stage);

      function changeColor(){
        console.log(floorData[0].block);
      }


    };

  function checkRound(floorNumber){ //檢查是否是安全區域
    safeArea.push(floorNumber)
    console.log('Area :: ' + safeArea)

    roundFloors(floorNumber).filter(e => e.text == 0 && !e.event).forEach(e => {
      console.log('checkRoundFloor :: '+e.id);

      if(!safeArea.some(i => i == e.id)){
        console.log('checkFloor :: '+e.id);

        console.log(' :: '+floorCheckList)
        if(floorCheckList.some(i => i == e.id)){
          // floorCheckList.splice(floorCheckList.indexOf(e.id), 1)
        }else{
          floorCheckList.push(e.id)
          checkRound(e.id)
          console.log('check :: ' + floorCheckList)
        }

      }
    })     
  }
  function roundFloors(floorNumber){
    // const Round = {
    //   'leftRloor':this.floorData[floorNumber - 1],
    //   'rightRloor':this.floorData[floorNumber + 1],
    //   'topRloor':this.floorData[floorNumber - this.xLength],
    //   'downRloor':this.floorData[floorNumber + this.xLength]
    // }
    let round = [];
    if(floorNumber - 1 >= 0){round.push(floorData[floorNumber - 1])}
    if(floorNumber + 1 < maxfloor){round.push(floorData[floorNumber + 1])}
    if(floorNumber - xLength >= 0){round.push(floorData[floorNumber - xLength])}
    if(floorNumber + xLength < maxfloor){round.push(floorData[floorNumber + xLength])}
    return round
  }


  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    },
    computed: {
    }
  }
</script>

<style lang="stylus">

body,html
  padding 0
  margin 0

</style>
