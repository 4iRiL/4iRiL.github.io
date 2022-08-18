let pageX, pageY
let countNo = 0
let ahuet = 1
let keydown, keymean
let mojna = false
ahuet = 1 ? console.log('Ебать че за вопросы нахуй') : console.log('Я гей')

document.addEventListener('keydown', event => {
    keydown = event
    keymean = keydown.key
    if (mojna) {
        no()
    }
})


function move (event) {
    pageX = event.pageX
    pageY = event.pageY
}

function rng (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function yes() {
    $('#ans').css({
        'top': pageY, 
        'left' : pageX
    })
    $('#ans').show()
}

function no() {
    $('#no').detach()
    $('#fake').show()
    //spawn
    let rngTop = rng(5,90)
    let rngLeft = rng(5,90)
    
    if (countNo < 5 || countNo > 9) {
        jQuery('<button class="border-button random" id="no" onclick="no()"> Нет </button>').css({'z-index': '0'}).appendTo('body')
        countNo++
    } else {
        jQuery('<button class="border-button random" id="no"> Нет </button>').css({'z-index': '0'}).appendTo('body')
        
    }
    
    $('.random').css({
        'position': 'absolute',
        'top': rngTop + '%',
        'left': rngLeft + '%'
    })
    
    if (countNo == 5) {
        key('Z')
        countNo++
        mojna = true
    } else if (countNo == 6 && keydown.code == 'KeyZ') {
        key('Space')
        countNo++
    } else if (countNo == 7 && keydown.code == 'Space') {
        key('u')
        countNo++
    } else if (countNo == 8 && keydown.code == 'KeyU') {
        key('t')
        countNo++
    } else if (countNo == 9 && keydown.code == 'KeyT') {
        key('q')
        countNo++
    } else if (countNo == 11 && keydown.code == 'KeyQ') {
        $('#word').text("Я гей")
        console.log('чета ищо буит')
        mojna = false
        countNo++
    }
    console.log(countNo)
}



function key (keyNada) {
    let word = $('#word').text()
    countNo > 5 ? word += keymean : -1
    keymean = undefined ? -1 : $('#word').text(word)
    
    $('#keyToClick').detach()
    jQuery('<h2 id="keyToClick"></h2>').text('Чтобы нажать "Нет" нажмите ' + keyNada).appendTo('#keyCont')
    
}