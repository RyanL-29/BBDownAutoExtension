var rcedit = require('rcedit')

rcedit('./app-win.exe' , {
  icon: './app.ico'
},(err) => {
  console.log(err)
})