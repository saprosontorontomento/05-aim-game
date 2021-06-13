const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board'),
      colors = ['#5bc489', '#3fb78d', '#23aa8f', '#009c8f', '#008d8c', '#007f86', '#0b717e', '#1c6373'];
let time = 0,
    score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up');
        startGame()
    }
})

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()

    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `
        <h1 class="styleBoard" >Ваш счёт: <span class='primary'>${score}</span></h1>
        <button type="submit" class="btnRefresh" class="styleBoard"  onClick="refreshPage()">refresh</button>
    `
}

function refreshPage() {
    window.location.reload();
} 

function createRandomCircle() {
    const circle = document.createElement('div'),
          size = getRandomNumber(10, 60),
          {width, height} = board.getBoundingClientRect()
          x = getRandomNumber(0, width - size),
          y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    setColor(circle)

    board.append(circle);
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 20px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    
    return colors[index];
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}