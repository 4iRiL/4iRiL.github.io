// Надо написать генератор карт
let number = {
    1 : 'A',
    2 : 2,
    3 : 3,
    4 : 4,
    5 : 5,
    6 : 6,
    7 : 7,
    8 : 8,
    9 : 9,
    10 : 10,
    11 : 'J',
    12 : 'Q',
    13 : 'K',
}
function rng(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
let suit = {
    1 : '♦',//'diamonds',
    2 : '♥',//'hearts',
    3 : '♣',//'clubs',
    4 : '♠',//'spades',
}
let cart
let value
let used = []
let cartValue
let countEbuchiy = 0
let generate = () => {
    cartValue = rng(1,13)
    if(cartValue > 10){
        cartValue = 10
    }
    value = number[cartValue]
    cart = value + ' ' +  suit[rng(1, 4)]
    if(used.includes(cart)){
        // console.log('Карта уже есть на столе, шуллер ебучий')
        countEbuchiy++
        if(countEbuchiy > 100){
            used = []
            console.log('Тут начался какой-то пиздец, поэтому я взял новую колоду')
            countEbuchiy = 0
        }
        generate()
    }else{
        used.push(cart)
        if(used.length > 41){
            console.log('Карт в колоде осталось мало, так что я пожалуй возьму новую')
            used = []
        }
    }
    return cart
}
let myTotal = 0
let casicTotal = 0
let lose = false
let win = false
let draw = false
let haveAce = false
let take = () => {

    

    if(canPlay == false){
        return console.log('Сделай ставку, чтобы начать игру')
    }
    generate()

    if(myTotal < 11 && cartValue == 1){
        cartValue = 11 
        haveAce = true
    }
    myTotal += cartValue
    if(haveAce == true && myTotal > 21){
        myTotal -= 10
        haveAce = false
    }
    myTotal > 21 ? lose = true : -1
    jQuery('<span/>',{'class': 'cart'}).text(cart).appendTo('.myCarts')

    if(lose){
        console.log('you lose this game')
        lose = true
        giveMoney()

    }
    myTotal == 21 ? win = true : -1
    if(win){
        console.log('You win!')
        giveMoney()
    }

    $('#myTotal').text(myTotal)

    
}
let restartButton = ()=>{
    $('.action1').remove()
    $('.action2').remove()
    $('.action3').remove()

    jQuery('<div/>', {
        //'type': 'button',
        //'value': 'Начать новую партию',
        'onclick': 'newGame()',
        'id': 'restartButton',
        'class' : 'button'
    }).text('New game').appendTo($('#actions'))
}
let hiddenCart
let gameStart = ()=>{
    //Достаем карту для казика
    generate()
    if(casicTotal < 11 && cartValue == 1){
        cartValue = 11 
    }
    casicTotal += cartValue
    jQuery('<span/>', {'class': 'cart'}).text(cart).appendTo($('.casicCarts')).appendTo('.casicCarts')
    generate()
    hiddenCart = cart
    casicTotal += cartValue
    jQuery('<span/>', {'id':'hidden'}).text('H').appendTo('.casicCarts')

    //Достаем карту для игрока

    take()
    take()

    if(casicTotal == 21 && myTotal < casicTotal){
        lose = true
        giveMoney()
    }
    if(myTotal == 21 && casicTotal == 21){
        console.log('БЛЯ, ТЫ ПРИКИНЬ! И У ТЕБЯ И У БОТА ЕБУЧЕГО НА ПЕРВОЙ РАСКИДКЕ 21!!!')
        draw = true
        $('#hidden').text(hiddenCart)
        $('#casicTotal').text(casicTotal)
        giveMoney()
    }
}
let casicCart = () => {
    while(casicTotal < myTotal && casicTotal < 22){
        generate()
        casicTotal += cartValue
        jQuery('<span/>', {'class' : 'cart'}).text(cart).appendTo($('.casicCarts'))
    }

    }
let pass = () => {
    if(canPlay == false){
        return console.log('Сделай ставку, чтобы начать игру')
    }
    
    while(casicTotal <= myTotal && casicTotal < 22){
        generate()
        casicTotal += cartValue
        jQuery('<span/>', {'class':'cart'}).text(cart).appendTo($('.casicCarts'))
    }

    if(casicTotal < myTotal && myTotal < 22){
        console.log('You win!')
        win = true
    }
    if(myTotal > 21){
        console.log('You lose :(')
        lose = true
    }
    if(myTotal < casicTotal && casicTotal < 22){
        console.log('You lose :(')
        lose = true
    }
    if(casicTotal > 21){
        console.log('You win!')
        win = true  
    }
    if(myTotal == casicTotal){
        console.log('лол, у вас ничья')
        draw = true
    }
    $('#hidden').text(hiddenCart)
    $('#casicTotal').text(casicTotal)
    giveMoney()
}
let betMoney
let money = 10000
let countDolbaeb = 0
let canPlay = false
let canBet = true
let bet = () => {

    restartCount == 1 ? newGame() : -1
    if(canBet == false){
        return console.log('Ты не можешь сейчас поставить, либо разраб долбаеб, либо ты')
    }
    betMoney = test()
    if(betMoney > money || betMoney == 0){
        countDolbaeb++
        alert("Нормальное число напиши")
        if(countDolbaeb > 9){
            jQuery('<span/>', {
                'class': 'dolbaeb',
            }).text('Да ты заебал уже, введи нормальное число').appendTo($('body'))
            console.log('Это как нужно было заебаться, чтобы блять 10 раз сначала ввести ненормальное число и 10 раз блять нажать в алерте ОК, это пиздец, чел')
        }
    }else{
        $('#beted').text('Your bet: $' + betMoney)
        $('.dolbaeb').remove()
        canPlay = true
        canBet = false
        gameStart()
        $('.carts').css('display', 'block')
        $('.total').css('display', 'inline')
    }

    
}

let test = () =>{
    str = $('#betInput').val()
    while(str[str.length - 1] == 'r' || str[str.length - 1] == 'k' || str[str.length - 1] == 'к'){
        str = str.replace(/r/, '000')
        str = str.replace(/к/, '000')
        str = str.replace(/k/, '000')
    }
    
    return str
}
let restartCount = 0
let giveMoney = () => {
    win ? money += betMoney * 1 : -1
    lose ? money -= betMoney * 1 : -1
    draw ? money = money : -1

    win ? $('#giveMoney').css('color', 'green').text('+ $' + betMoney) : -1
    lose ? $('#giveMoney').css('color', 'red').text('- $' + betMoney) : -1

    $('#money').text('$' + money)
    restartButton()
    restartCount++
}
let newGame = () => {
    casicTotal = 0
    myTotal = 0
    restartCount = 0
    $('.cart').remove()
    $('#hidden').remove()
    $('.total').text('0')
    win = false 
    lose = false
    draw = false
    canPlay = false
    canBet = true

    $('#restartButton').remove()
    jQuery('<div/>', {
        'class' : 'action1 button',
        'onclick': 'take()',
    }).text('Take').appendTo($('#actions'))
    
    jQuery('<div/>', {
        'class' : 'action2 button',
        'onclick': 'pass()',
    }).text('Pass').appendTo($('#actions'))
    
    
    $('.carts').css('display', 'none')
    $('.total').css('display', 'none')

    $('#giveMoney').text('')

}

let countOchko = 0
async function ochko(){
    $('#ochkoBlind').remove()
    if(countOchko == 0){
        makeBlind()
        await sleep(1000)
        $('#to').text(' Очко ')
        countOchko++
        $('link[rel="stylesheet"]').remove()
        $('head').append('<link rel="stylesheet" href="css2.css">')
    }
    else{
        makeBlind()
        await sleep(1000)
        $('#to').text('Blackjack')
        countOchko--
        $('link[rel="stylesheet"]').remove()
        $('head').append('<link rel="stylesheet" href="css.css">')
    }
}
let makeBlind = () => {
    let color = countOchko == 0 ? '#1D1B26' : '#225201'
    jQuery('<div/>',{'id': 'ochkoBlind'}).css({
        'width' : '100%',
        'height' : '0px',
        'background' : color,
        'position' : 'absolute',
        'top' : '0px',
        'left' : '0px',
        'animation' : 'blind 2.5s cubic-bezier(0.63, 0.09, 0.61, 0.74)',
    }).appendTo($('html'))
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
let canUse = []
let someCart
let prices = []
let pricesHelp
let chanse = () => {
    canUse = []
    for(let n = 1; n < 5;n++){
        for(let i = 1;i < 14;i++){
            someCart = number[i] + ' ' + suit[n]
            if(used.includes(someCart)){
                -1
            }else{
                canUse.push(someCart)
            }
            
        }
    }
    
    for(let i = 0;i < canUse.length;i++){
        pricesHelp = canUse[i].replace(/..$/, '')
        if(myTotal > 11 || casicTotal > 11){
            pricesHelp = pricesHelp.replace(/A/, '1')
        }else{
            pricesHelp = pricesHelp.replace(/A/, '11')
        }
        pricesHelp = pricesHelp.replace(/J/, '10')
        pricesHelp = pricesHelp.replace(/Q/, '10')
        pricesHelp = pricesHelp.replace(/K/, '10')
        prices.push(pricesHelp)
    }
    prices.sort()
    count(prices)
    
    percentage = {
        1:  names[1] != undefined? Math.round((names[1]  / canUse.length) * 100) + '%' : 0,
        2:  Math.round((names[2]  / canUse.length) * 100) + '%',
        3:  Math.round((names[3]  / canUse.length) * 100) + '%',
        4:  Math.round((names[4]  / canUse.length) * 100) + '%',
        5:  Math.round((names[5]  / canUse.length) * 100) + '%',
        6:  Math.round((names[6]  / canUse.length) * 100) + '%',
        7:  Math.round((names[7]  / canUse.length) * 100) + '%',
        8:  Math.round((names[8]  / canUse.length) * 100) + '%',
        9:  Math.round((names[9]  / canUse.length) * 100) + '%',
        10: Math.round((names[10] / canUse.length) * 100) + '%',
        11: names[11] != undefined ? Math.round((names[11] / canUse.length) * 100) + '%' : 0,
    }

    return percentage
}


let percentage = {}


let names = {}
let count = (array) => {
    array.forEach(item => {
        names[item] = (names[item] || 0) + 1
    })
    return names
}
let sumOfAll = 0
let sumAll = () => {
    for(let i = 1; i < 11;i++){
        (names[i] / canUse.length) != NaN ? sumOfAll += names[i] / canUse.length: -1
    }
    return sumOfAll
}
console.log('23.01.22 version')