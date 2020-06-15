let backMove
function moveEparaFundo(elemento, moveOuPara = true) {
    let i = 0
    if (moveOuPara === true) {
        backMove = setInterval(() => { elemento.style.backgroundPosition = `${i--}px`; }, 50)
    } else {
        clearInterval(backMove);
    }
}

function criaColuna(indice = 1, clone = coluna) {

    let elemento = criaCloneComID(clone, `col-${indice}`)
    // console.log(elemento)
    elemento.appendChild(criaCloneComID(divTuboCima, `cima${indice}`))
    elemento.appendChild(criaCloneComID(passagem))
    elemento.appendChild(criaCloneComID(divTuboBaixo, `baixo${indice}`))
    // console.log(elemento.firstChild)
    // console.log(elemento.lastChild)
    elemento.firstChild.style.flexGrow = FlexGrowRadom()
    elemento.lastChild.style.flexGrow = FlexGrowRadom()
    // console.log(elemento.lastChild.style.flexGrow )
    return elemento
}
function criaCloneComID(filho, id = 'clone') {
    let clone = filho.cloneNode(true)
    clone.setAttribute('id', id)
    return clone
}
function FlexGrowRadom() {
    return (Math.random().toFixed(2) * 10)
}

const divJogo = document.querySelector('[wm-flappy]')

const tuboCano = document.createElement('div')
tuboCano.classList.add('tuboCano')
const tuboTopo = document.createElement('div')
tuboTopo.classList.add('tuboTop')


const divTuboCima = document.createElement('div')
divTuboCima.classList.add('tuboCima')
divTuboCima.appendChild(criaCloneComID(tuboTopo, 'partCima1'))
divTuboCima.appendChild(criaCloneComID(tuboCano, 'partCima2'))


const divTuboBaixo = document.createElement('div')
divTuboBaixo.classList.add('tuboBaixo')
divTuboBaixo.appendChild(criaCloneComID(tuboTopo, 'partBaixo1'))
divTuboBaixo.appendChild(criaCloneComID(tuboCano, 'partBaixo2'))


const passagem = document.createElement('div')
passagem.classList.add('passagem', 'passagem')

const coluna = document.createElement('div')
coluna.classList.add('coluna')

//bird person 
const passaroDiv = document.createElement('div')
passaroDiv.classList.add('passaro')

//adicionado passaro a div jogo 
divJogo.appendChild(passaroDiv)
passaroDiv.style.top = '45%'
passaroDiv.style.left = '0%'

const pontuacao = document.createElement('h1')
pontuacao.classList.add('ponto')
pontuacao.innerHTML = '0'

divJogo.appendChild(pontuacao)

const body = document.querySelector('body')



/**Controles  */

const pulo = (passo) => {
    passaroDiv.style.top =
        parseInt(passaroDiv.style.top) - passo >= 0 ? `${parseInt(passaroDiv.style.top) - passo}%` : '0%'
}

let caindo
const cai = (passo) => {
    caindo = setInterval(() => {
        passaroDiv.style.top = parseInt(passaroDiv.style.top) + passo <= 90 ? `${parseInt(passaroDiv.style.top) + passo}%` : '90%'
        // console.log(passaroDiv.style.top)
    }, 150)
}

function direita(passo) {

    passaroDiv.style.left = parseInt(passaroDiv.style.left) + passo <= 90 ? `${parseInt(passaroDiv.style.left) + passo}%` : '90%'

}
const esquerda = (passo) => {
    passaroDiv.style.left =
        parseInt(passaroDiv.style.left) - passo >= 0 ? `${parseInt(passaroDiv.style.left) - passo}%` : '0%'
}

function baixo(passo) {
    passaroDiv.style.top = parseInt(passaroDiv.style.top) + passo <= 90 ? `${parseInt(passaroDiv.style.top) + passo}%` : '90%'
}

let movimentoCols
// let carrocel 
function moveColuna(element, i = -15) {
    movimentoCols = setInterval(() => {
        element.style.right = `${i}%`
        i += 0.1
        // console.log(element.style.right)
    }, 20)
}

function renewCol(indice, element) {
    divJogo.removeChild(element)
    divJogo.appendChild(criaColuna(indice))
}



const rangeIntersect = function (min0, max0, min1, max1) {
    return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
}
//Função para detectar se 2 BoundingClientRect's estão colidindo
const rectIntersect = function (r0, r1) {
    return rangeIntersect(r0.left, r0.right, r1.left, r1.right) && rangeIntersect(r0.top, r0.bottom, r1.top, r1.bottom)
}


function colisao(item1, item2 = passaroDiv) {

    let colisaoA = item1.getBoundingClientRect()
    let colisaoB = item2.getBoundingClientRect()
    if (rectIntersect(colisaoA, colisaoB)) {
        stopGame()
    }
    else {
        
    }
}


function contaPontuacao(item1, item2 = passaroDiv) {
    let colisaoA = item1.getBoundingClientRect()
    let colisaoB = item2.getBoundingClientRect()
    if (rectIntersect(colisaoA, colisaoB)) {
        pontuacao.innerHTML = parseInt(parseInt(pontuacao.innerHTML)+ 1.0)
        // pontuacao.innerHTML = parseInt(pontuacao.innerHTML) + 1
        // item1.style.border = 'solid 5px green'
    }
}





let ctrl = 0
body.addEventListener("keydown", e => {
    // console.log(e.key, e.keyCode)
    if (e.keyCode == 32 && ctrl === 0) {
        startGame()
        ctrl = 1
    }
})

let x9
var olheiro
function startGame() {
    passaroDiv.style.top = '45%'
    passaroDiv.style.left = '0%'

    moveEparaFundo(divJogo)
    // cai(3.5)
    body.addEventListener("keydown", (e) => {
        if(ctrl === 1){
        switch (parseInt(e.keyCode)) {
            case 38:
                pulo(2.5)
                break
            case 40:
                baixo(3)
                break
            case 39:
                direita(2, 5)
                break
            case 37:
                esquerda(2, 5)
                break
        }}
    })
    body.addEventListener("keyup", e => {
        clearInterval(caindo)
        cai(3.5)
    })

    divJogo.appendChild(criaColuna(1))
    let col1 = document.getElementById("col-1")
    let col2 = document.getElementById("col-2")
    let col3 = document.getElementById("col-3")
    let col1Criado = 1
    let col2Criado = 0
    let col3Criado = 0
    colisao(col1)
    moveColuna(col1)

    olheiro = setInterval(() => {
        switch (parseInt(col1.style.right)) {
            case 35:
                if (col2Criado === 0) {
                    divJogo.appendChild(criaColuna(2))
                    col2 = document.getElementById("col-2")
                    moveColuna(col2)
                    col2Criado = 1
                }
                break;
            case 100:
                if (col1Criado === 1) {
                    renewCol(1, col1)
                    col1Criado = 0
                }
                break;
        }
        switch (parseInt(col2.style.right) || 0) {
            case 35:
                if (col3Criado === 0) {
                    divJogo.appendChild(criaColuna(3))
                    col3 = document.getElementById("col-3")
                    moveColuna(col3)
                    col3Criado = 1
                }
                break;
            case 100:
                if (col2Criado === 1) {
                    renewCol(2, col2)
                    col2Criado = 0
                }
                break;
        }
        switch (parseInt(col3.style.right) || 0) {
            case 35:
                if (col1Criado === 0) {
                    col1 = document.getElementById("col-1")
                    moveColuna(col1)
                    colisao(col1)
                    col1Criado = 1
                }
                break;
            case 100:
                if (col3Criado === 1) {
                    renewCol(3, col3)
                    col3Criado = 0
                }
                break;
        }

    }, 75)


    x9 = setInterval(() => {
        if (col1Criado === 1) {
            colisao(col1.firstChild)
            colisao(col1.lastChild)
            contaPontuacao(col1.childNodes[1])
        }
        if (col2Criado === 1) {
            colisao(col2.firstChild)
            colisao(col2.lastChild)
            contaPontuacao(col2.childNodes[1])
        }
        if (col3Criado === 1) {
            colisao(col3.firstChild)
            colisao(col3.lastChild)
            contaPontuacao(col3.childNodes[1])
        }

    }, 100)

}




function stopGame() {
    // debugger
    clearInterval(caindo)
    clearInterval(caindo)
    clearInterval(caindo) 
    clearInterval(x9)
    clearInterval(olheiro)
    clearInterval(movimentoCols)
    clearInterval(movimentoCols)
    clearInterval(movimentoCols)
    clearInterval(movimentoCols)
    clearInterval(backMove)
    ctrl = 0
}