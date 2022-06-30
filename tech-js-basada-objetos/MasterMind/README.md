<h1> <p align="center">MasterMind (Diagrama UML)</p></h1>

![Image text](<https://github.com/USantaTecla-ed-mpds/lab-dijkstra/blob/master/tech-js-basada-objetos/MasterMind/UML/MasterMind-UML.png>)
 
```
@startuml
title Mastermind
object game {
COLORS,
COMBINATION_LENGTH,
MAX_ATTEMPS
play(),
printResults(),
isLooser()
}

object yesOrNoContinue{
answer,
askContinue()
isAfirmative(),
isNegative()
}

object combination{
proposedCombinations,
readCombination()
isCorrectLenght(),
isCorrectColor(),
isRepeatColor()
}

object result{
blacks,
whites
}

object secret{
calculateResult()
isWinner()
}

game .left.> yesOrNoContinue
game _-down-> result
game _-down-> secret
game \*-down-> combination
secret -right-> result
secret -left-> combination

@enduml
```
