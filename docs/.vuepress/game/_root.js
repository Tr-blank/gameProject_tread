import PIXI from 'pixi.js'


class Root {

  constructor () {

    this._ready()
    this._setupRender()
  }
  _ready () {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }
  _setupRender () {
    // Remove PIXI banner from the console
    PIXI.utils.sayHello = () => {}

    const options = {
      transparent: true,
      autoResize: true,
      antialias: true,
      resolution: 1 || window.devicePixelRatio // TODO: Optimize Ratio
    }

    const type = navigator.userAgent.match(/Version\/[\d.]+.*Safari/) ? '2d' : 'auto'

    switch (type) {
      case '2d':
        this.renderer = new PIXI.CanvasRenderer(this.width, this.height, options)
        break
      case 'auto':
        this.renderer = new PIXI.WebGLRenderer(this.width, this.height, options)
    }

    this.stage = new PIXI.Container()
  }
  resume () {
    this._startRender()
  }

}

export default new Root()
