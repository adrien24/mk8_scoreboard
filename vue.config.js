module.exports = {

  pwa: {
    name:'Scoreboard',
    themeColor: '#1C1C1C',    
    msTileColor: '#000000',
    workboxOptions: {
        skipWaiting: true
    }
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/rocket/adrien/scoreboard/'
    : '/'

   
}
