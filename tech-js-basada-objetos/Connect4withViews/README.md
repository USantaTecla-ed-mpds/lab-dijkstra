# Connect4 (Diagrama UML)

<p align="center">
  <img src="https://github.com/USantaTecla-ed-mpds/lab-dijkstra/blob/master/tech-js-basada-objetos/Connect4withViews/UML/Connect4-0.png">
 </p>

```
@startuml
'https://plantuml.com/class-diagram

class initGame
class initCoordinate
class initBoardView
class initBoard
class initPlayer
class initGameView
class initYesNoDialogView
class initConnect4View

initConnect4View --> initGameView
initConnect4View ..> initYesNoDialogView
initGameView -->initGame
initGame --> initCoordinate
initGame --> initBoardView
initBoardView --> initBoard
initGame --> initPlayer

class initGame{
MAX_MOVEMENTS
updateGrid()
isEndGame()
isWinner()
isTied()
}
class initCoordinate{
row
col
owner
}
class initBoardView{
board
showBoard()
readColumn()
}
class initBoard{
MIN_ROWS
MIN_COLUMNS
MAX_ROWS
MAX_COLUMNS
NUMBER_CONNECTIONS
grid
isConnectedInVertical()
isConnectedInHorizontal()
isConnectedInDiagonal()
}
class initPlayer{
turn
player1
player2
getTurn()
changeTurn()
}
class initGameView{
play()
showBoard()
showFinalMsg()
}
class initYesNoDialogView{
read()
isAffirmative()
isNegative()
}
class initConnect4View{
play()
}
@enduml
