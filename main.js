const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const borderSize = 12
const ballSize = 10
const paddle = {
  height: 75,
  width: 10,
  vy: 20
}
const players = [
  {
    ...paddle,
    x: paddle.width,
    y: canvas.height / 2 - paddle.height / 2,
    score: 0
  },
  {
    ...paddle,
    x: canvas.width - paddle.width * 2,
    y: canvas.height / 2 - paddle.height / 2,
    score: 0
  }
]
const ball = {
  x: players[0].x + paddle.width + ballSize,
  y: canvas.height / 2 - ballSize / 2,
  vx: 6,
  vy: 3
}

function render() {
  drawBoard()
  drawScore(players[0].score, players[1].score)
  drawPaddle(players[0].x, players[0].y)
  drawPaddle(players[1].x, players[1].y)
  drawBall(ball)
  requestAnimationFrame(render)
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'rgb(173, 173, 173)'
  ctx.fillRect(0, 0, canvas.width, borderSize)
  ctx.fillRect(0, canvas.height - borderSize, canvas.width, borderSize)

  const dashCount = Math.ceil(canvas.height / borderSize)

  for (let i = 0; i < dashCount; i++) {
    ctx.fillRect(canvas.width / 2 - borderSize / 2, i*borderSize*2+borderSize, borderSize, borderSize)
  }
}

function drawScore(a, b) {
  const fontSize = 60
  ctx.font = `normal bold ${fontSize}px Helvetica`
  ctx.fillText(''+a, canvas.width / 2 - fontSize, borderSize + fontSize)
  ctx.fillText(''+b, canvas.width / 2 + fontSize / 2, borderSize + fontSize)
}

function drawPaddle(x, y) {
  ctx.fillStyle = 'white'
  ctx.fillRect(x, y, paddle.width, paddle.height)
}

function scorePlayer(player) {
  const otherPlayer = player === 0 ? 1 : 0
  ball.vx = -ball.vx
  players[player].score++
  players[player].y = canvas.height / 2 - paddle.height / 2
  players[otherPlayer].y = canvas.height / 2 - paddle.height / 2
  if (player === 0) {
    ball.x = canvas.width - paddle.width * 2 - ballSize
  } else {
    ball.x = players[otherPlayer].x + paddle.width + ballSize
  }
  ball.y = canvas.height / 2 - ballSize / 2
}

function drawBall(ball) {
  ctx.fillStyle = 'white'
  ctx.fillRect(ball.x, ball.y, ballSize, ballSize)
  ball.x += ball.vx
  ball.y += ball.vy

  const collisionBottom = ball.y > canvas.height - borderSize - ballSize
  const collisionTop = ball.y < borderSize
  const collisionLeft = ball.x < players[0].x + paddle.width && ball.y > players[0].y && ball.y < players[0].y + paddle.height//todo: copypasta
  const collisionRight = ball.x > players[1].x - paddle.width && ball.y > players[1].y && ball.y < players[1].y + paddle.height

  if (collisionBottom || collisionTop) {
    ball.vy = -ball.vy
  } else if (collisionLeft || collisionRight) {
    ball.vx = -ball.vx
  } else if (ball.x < players[0].x - paddle.width) {
    scorePlayer(1)
  } else if (ball.x > players[1].x + paddle.width) {
    scorePlayer(0)
  }
}

document.addEventListener('keypress', event => {
  switch (event.key) {
    case 'w':
      players[0].y = Math.max(borderSize, players[0].y - paddle.vy)
      break
    case 's':
      players[0].y = Math.min(canvas.height - paddle.height - borderSize, players[0].y + paddle.vy)
      break
    case 'ArrowUp':
      players[1].y = Math.max(borderSize, players[1].y - paddle.vy)
      break
    case 'ArrowDown':
      players[1].y = Math.min(canvas.height - paddle.height - borderSize, players[1].y + paddle.vy)
      break
  }
})

requestAnimationFrame(render)
