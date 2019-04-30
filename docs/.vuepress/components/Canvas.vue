<template lang="html">
  <div id="game"></div>
</template>

<script>

export default {
  data() {
    return {
      floorCheckList : [],
      safeArea:[],
      floorData :[],
      maxfloor : 80,
      xLength:10
    }
  },
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




    let y = 0;  
    let x = 0;
    this.floorData = new Array(this.maxfloor);
    // 初始化地圖資訊
    for(let i =0 ;i<this.maxfloor;i++){
      this.floorData[i] = {
        'id':0,
        'text':0,
        'event':false,
        'safeAreaID':0 
      };
    }
    // console.log(this.floorData);

    // 產生亂數地雷位置
    let randomArray =[];
    for(let i=0;i<10;i++){
      let number = Math.floor(Math.random()*this.maxfloor);
      randomArray.push(number);
     }
    console.log(randomArray);
    let safeFloors = []
    for(let i =0 ;i<this.maxfloor;i++){
        x++;  
        if(i % this.xLength ==0){
            y++;
            x=0;
        }
        
        this.floorData[i].id = i;
        this.floorData[i].xSite= 10+42*x;
        this.floorData[i].ySite= 100+42*y;
        this.floorData[i].event = randomArray.some(e => e == i);
        this.floorData[i].block = new PIXI.Graphics();
        // 長方形

        if(!this.floorData[i].event){
          // 沒有地雷
          this.floorData[i].block.beginFill(0xDE3249);  
        }else{
          // 有地雷
          this.floorData[i].block.beginFill(0x1099bb);
          // console.log(this.floorData[i+1]);
          // 地雷周邊地區提示數字＋１
          if(i % this.xLength == 0 && i < this.xLength){
            if(i+1 < this.maxfloor){this.floorData[i+1].text++};
            if(i+this.xLength < this.maxfloor){this.floorData[i+this.xLength].text++};
            if(i+this.xLength+1 < this.maxfloor ){this.floorData[i+this.xLength+1].text++};            
          }else if(i % this.xLength == 0 && i > this.maxfloor - this.xLength){
            if(i+1 < this.maxfloor){this.floorData[i+1].text++};
            if(i-this.xLength >= 0){this.floorData[i-this.xLength].text++};
            if(i-this.xLength+1 >= 0 ){this.floorData[i-this.xLength+1].text++};
          }else if(i % this.xLength == this.xLength-1 && i < this.xLength){
            if(i-1 >= 0){this.floorData[i-1].text++};
            if(i+this.xLength < this.maxfloor){this.floorData[i+this.xLength].text++};
            if(i+this.xLength-1 < this.maxfloor ){this.floorData[i+this.xLength-1].text++};          
          }else if(i % this.xLength == this.xLength-1 && i > this.maxfloor - this.xLength){
            if(i-1 >= 0){this.floorData[i-1].text++};
            if(i-this.xLength >= 0){this.floorData[i-this.xLength].text++};
            if(i-this.xLength-1 >= 0 ){this.floorData[i-this.xLength-1].text++};
          }else if(i % this.xLength == 0){
            if(i+1 < this.maxfloor){this.floorData[i+1].text++};
            if(i-this.xLength >= 0){this.floorData[i-this.xLength].text++};
            if(i-this.xLength+1 >= 0 ){this.floorData[i-this.xLength+1].text++};
            if(i+this.xLength < this.maxfloor){this.floorData[i+this.xLength].text++};
            if(i+this.xLength+1 < this.maxfloor ){this.floorData[i+this.xLength+1].text++};
          }else if(i % this.xLength == this.xLength-1){
            if(i-1 >= 0){this.floorData[i-1].text++};
            if(i-this.xLength >= 0){this.floorData[i-this.xLength].text++};
            if(i-this.xLength-1 >= 0 ){this.floorData[i-this.xLength-1].text++};
            if(i+this.xLength < this.maxfloor){this.floorData[i+this.xLength].text++};
            if(i+this.xLength-1 < this.maxfloor ){this.floorData[i+this.xLength-1].text++};
          }else if(i < this.xLength){
            if(i-1 >= 0){this.floorData[i-1].text++};
            if(i+1 < this.maxfloor){this.floorData[i+1].text++};
            if(i+this.xLength < this.maxfloor){this.floorData[i+this.xLength].text++};
            if(i+this.xLength-1 < this.maxfloor ){this.floorData[i+this.xLength-1].text++};
            if(i+this.xLength+1 < this.maxfloor ){this.floorData[i+this.xLength+1].text++};
          }else if(i > this.maxfloor - this.xLength){
            if(i-1 >= 0){this.floorData[i-1].text++};
            if(i+1 < this.maxfloor){this.floorData[i+1].text++};
            if(i-this.xLength >= 0){this.floorData[i-this.xLength].text++};
            if(i-this.xLength-1 >= 0 ){this.floorData[i-this.xLength-1].text++};
            if(i-this.xLength+1 >= 0 ){this.floorData[i-this.xLength+1].text++};
          }else{
            if(i-1 >= 0){this.floorData[i-1].text++};
            if(i+1 < this.maxfloor){this.floorData[i+1].text++};
            if(i-this.xLength >= 0){this.floorData[i-this.xLength].text++};
            if(i-this.xLength-1 >= 0 ){this.floorData[i-this.xLength-1].text++};
            if(i-this.xLength+1 >= 0 ){this.floorData[i-this.xLength+1].text++};
            if(i+this.xLength < this.maxfloor){this.floorData[i+this.xLength].text++};
            if(i+this.xLength-1 < this.maxfloor ){this.floorData[i+this.xLength-1].text++};
            if(i+this.xLength+1 < this.maxfloor ){this.floorData[i+this.xLength+1].text++};
          }
        }
        this.floorData[i].block.drawRect(this.floorData[i].xSite, this.floorData[i].ySite, 40, 40);
        this.floorData[i].block.endFill();
        this.floorData[i].block.buttonMode = true;
        this.floorData[i].block.alpha = 0.5;
        stage.addChild(this.floorData[i].block);

        this.floorData[i].block.interactive = true;
        // make circle non-transparent when mouse is over it
        this.floorData[i].block.pointerdown = function(mouseData) {
            this.alpha = 1;
            console.log(this.floorData[i].id + '::' +this.floorData[i].text);
        }

        // make circle half-transparent when mouse leaves
        this.floorData[i].block.pointerup = function(mouseData) {
            this.alpha = 0.5;
        }
    }

    this.floorData.forEach((e,i) =>{
      if(e.text == 0 && !e.event){safeFloors.push(i)}
      if(!randomArray.some(e => e == i)){
        e.textBlock = new PIXI.Text(e.text);
        e.textBlock.x = e.xSite;
        e.textBlock.y = e.ySite;
        stage.addChild(e.textBlock);
      }
    });
    console.log(safeFloors)//安全的地板
    console.log(this.floorData);

    this.safeArea.push(safeFloors[0])
    this.checkRound(safeFloors[0])

    // this.floorCheckList.forEach(e => {
    //   this.checkRound(e)
    // })

    console.log('Area :: ' + this.safeArea)
    console.log('check :: ' + this.floorCheckList)
    // start animating
    animate();

    function animate() {
    requestAnimationFrame(animate);
    // render the root container
    renderer.render(stage);
    };
  },
  methods: {
    checkRound(floorNumber){ //檢查是否是安全區域
      this.roundFloors(floorNumber).filter(e => e.text == 0 && !e.event).forEach(e => {
        if(!this.safeArea.some(i => i == e.id)){
          this.floorCheckList.push(e.id)
          this.checkRound(e.id)
        }else{
          this.safeArea.push(e.id)
        }
        if(this.floorCheckList.some(i => i == e.id)){
          this.floorCheckList.splice(this.floorCheckList.indexOf(e.id), 1)
        }

      })
      
    },
    roundFloors(floorNumber){
      // const Round = {
      //   'leftRloor':this.floorData[floorNumber - 1],
      //   'rightRloor':this.floorData[floorNumber + 1],
      //   'topRloor':this.floorData[floorNumber - this.xLength],
      //   'downRloor':this.floorData[floorNumber + this.xLength]
      // }
      let round = [];
      if(floorNumber - 1 >= 0){round.push(this.floorData[floorNumber - 1])}
      if(floorNumber + 1 < this.maxfloor){round.push(this.floorData[floorNumber + 1])}
      if(floorNumber - this.xLength >= 0){round.push(this.floorData[floorNumber - this.xLength])}
      if(floorNumber + this.xLength < this.maxfloor){round.push(this.floorData[floorNumber + this.xLength])}
      return round
    }
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
