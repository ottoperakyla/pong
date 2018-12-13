import Bacon from 'baconjs'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const borderSize = 12
const paddle = {
  height: 75,
  width: 10
}
const ball = {
  width: 10,
  height: 10,
  padding: 5
}

function initGame() {
  ctx.fillStyle = 'rgb(173,173,173)'
  ctx.fillRect(0, 0, canvas.width, borderSize)
  ctx.fillRect(0, canvas.height - borderSize, canvas.width, borderSize)
  
  const dashCount = Math.ceil(canvas.height / borderSize)
  
  for (let i = 0; i < dashCount; i++) {
    ctx.fillRect(canvas.width / 2 - borderSize / 2, i*borderSize*2+borderSize, borderSize, borderSize)
  }  

  drawScore(0, 0)
  drawPaddle(paddle.width, canvas.height / 2 - paddle.height / 2)
  drawPaddle(canvas.width - paddle.width*2, canvas.height / 2 - paddle.height / 2)
  drawBall(paddle.width + ball.width + ball.padding, canvas.height / 2 - ball.height / 2)
}

function drawScore(a: number, b: number) {
  const fontSize = 60
  ctx.font = `normal bold ${fontSize}px Helvetica`
  ctx.fillText(''+a, canvas.width / 2 - fontSize, borderSize + fontSize)
  ctx.fillText(''+b, canvas.width / 2 + fontSize / 2, borderSize + fontSize)  
}

function drawPaddle(x: number, y: number) {
  ctx.fillStyle = 'white'
  ctx.fillRect(x, y, paddle.width, paddle.height)
}

function drawBall(x: number, y: number) {
  ctx.fillStyle = 'white'
  ctx.fillRect(x, y, ball.width, ball.height)
}

initGame()
