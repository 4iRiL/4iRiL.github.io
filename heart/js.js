let xt = t => 16 * Math.sin(t) ** 3
let yt = t => 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
let i = 0
let beginHeart = () => {
    let r,g,b
    i++
    if(i == 320){
        i = 700
    }
    if (i > 1050){
        r = 255
        g = 255
        b = 255
    }else{
        r = (255 - i) % 255
        g = i % 255
        b = parseInt((255 + i) / 2) % 255
    }
    if (r == 0 & g == 0 & b ==0){
        i++
        r = (255 - i) % 255
        g = i % 255
        b = parseInt((255 + i) / 2) % 255
    }
    if (i > 2000){
        r = 217
        g = 128
        b = 250
    }
    if (i > 3000){
        r = 0
        g = 0
        b = 0
    }
    let canv = document.getElementById('canv')
    let cv = canv.getContext('2d')
    // i == 3000 ? cv.clearRect(0,0,1000,1000) : -1
    // i == 3000 ? i = 0 : -1
    let xc = 500
    let yc = 500
    if (i > 4000){
        cv.clearRect(0,0,1000,1000)
        i = 1
        r = (255 - i) % 255
        g = i % 255
        b = parseInt((255 + i) / 2) % 255
    }
    cv.beginPath()
    cv.moveTo(xc, yc)
    
    console.log(i)
    let color = "rgb(" + r + ", " + g + ", " + b + ")"
    cv.strokeStyle = color
    cv.lineTo(xc + (xt(i)* 20), yc - (yt(i)) * 20)
    cv.stroke()
    cv.closePath()
    console.log(i)
}
let count_someOther = 0
let someOther = () => {
    count_someOther == 0 ? setInterval(beginHeart, 20) : -1
    
}