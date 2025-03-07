document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById('start')
    let reset = document.getElementById('reset')
    let contador = 0
    let players = document.getElementById('players')
    let board = document.getElementById('board')
    let juegoTerminado = false

    boton.addEventListener('click', function () {
        reset.click()
        board.classList.remove('board-3x3', 'board-5x5', 'board-7x7')
        let player1 = document.getElementById('player1').value
        let player2 = document.getElementById('player2').value
        let boardSize = parseInt(document.getElementById('tamaño').value)
        
        if (boardSize == 1 ) {
            board.classList.add('board-3x3')
            tablero(3,player1,player2,contador)
        }  else if (boardSize == 2) {
            board.classList.add('board-5x5')
            tablero(5,player1,player2,contador)
        } else if (boardSize == 3) {
            board.classList.add('board-7x7')
            tablero(7, player1, player2, contador)
        } else {
            console.log('No se puede jugar')
        }

    })

    reset.addEventListener('click', function () {

        document.getElementById('board').innerHTML = ''
        document.getElementById('players').innerHTML = 'Es turno de X'
        contador = 0
    })

    function ganador(boardArray, tamaño) {
        let ganador = ''
        // Verificar la Fila
        for (let i = 0; i < tamaño; i++) {
            let contadorX = 0
            let contadorO = 0
            for (let j = 0; j < tamaño; j++) {
                if (boardArray[i][j].innerText === 'X') {
                    contadorX++
                } else if (boardArray[i][j].innerText === 'O') {
                    contadorO++
                }
            }
            if (contadorX === tamaño) {
                ganador = 'X'
            } else if (contadorO === tamaño) {
                ganador = 'O'
            }
        }

        // Verificar la columna 
        for (let i = 0; i < tamaño; i++) {
            let contadorX = 0
            let contadorO = 0
            for (let j = 0; j < tamaño; j++) {
                if (boardArray[j][i].innerText === 'X') {
                    contadorX++
                } else if (boardArray[j][i].innerText === 'O') {
                    contadorO++
                }
            }
            if (contadorX === tamaño) {
                ganador = 'X'
            } else if (contadorO === tamaño) {
                ganador = 'O'
            }
        }

        // Revisar diagonales 

        // Diagonal principal
        let contadorX = 0
        let contadorO = 0
        for (let i = 0; i < tamaño; i++) {
            if (boardArray[i][i].innerText === 'X') { // Si en cada diagonal es igual
                contadorX++
            } else if (boardArray[i][i].innerText === 'O') {
                contadorO++
            }
            if (contadorX === tamaño) {
                ganador = 'X'
            } else if (contadorO === tamaño) {
                ganador = 'O'
            }
        }
        contadorX = 0
        contadorO = 0

        // Diagonal secundaria
        for (let i = 0; i < tamaño; i++) {
            if (boardArray[i][tamaño -i -1].innerText === 'X') { // Si en cada diagonal es igual
                contadorX++
            } else if (boardArray[i][tamaño -i -1].innerText === 'O') {
                contadorO++
            } 
            if (contadorX === tamaño) {
                ganador = 'X'
            } else if (contadorO === tamaño) {
                ganador = 'O'
            }
        }
        return ganador
    }
    function tablero(tamaño, player1, player2, contador) {
        let boardArray = []
        juegoTerminado = false
        for ( let i = 0; i < tamaño; i++) { // Fila
            boardArray[i] = [] // Inicia el array con las filas
            for (let j = 0; j < tamaño; j++) { // Columna 
                let newDiv = document.createElement('div')
                newDiv.classList.add('cell') // Agrega la clae cell al div

                newDiv.addEventListener('click', function () {
                    if (juegoTerminado) {
                        return
                    }
                    if (newDiv.innerText !== '') { // Si el div ya tiene un texto no se puede volver a jugar
                        return
                    }  
                    if (contador%2 == 0) { // Si es par es turno del primer jugador
                        newDiv.innerText = 'X' // Se dibuja la jugada
                        players.innerText = 'Es turno de ' + player1
                    } else {
                        newDiv.innerText = 'O'
                        players.innerText = 'Es turno de ' + player2
                    }
                    contador++
                    let winner = ganador(boardArray, tamaño)
                    if (winner != '') {
                        alert('El ganador es ' + winner)
                        juegoTerminado = true
                    }
                })

                //Almacenar el div en la matriz
                boardArray[i][j] = newDiv
                console.log(boardArray);

                document.getElementById('board').appendChild(newDiv)
            }
        }
    }
})

