module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    base:'',
    port:'8000',
    head: [
        ['script', { src: `https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.7/pixi.min.js` }],
        // ['script', { src: `js/game.js` }]
    ],
    // configureWebpack: (config, isServer) => {
    //   if (!isServer) {
    //     plugins: [
    //       // other plugins
    //       // ...
    //       new webpack.ProvidePlugin({
    //         PIXI: "pixi.js",
    //       })
    //     ]
    //   }
    // }
}

