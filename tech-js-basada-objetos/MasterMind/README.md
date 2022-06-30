# MasterMind (Diagrama UML)

![Image text](<https://github.com/andresito87/MPDS-EscuelaIT/blob/main/21-js-basadaObjetos/MasterMind/MasterMindv0.3(Dise%C3%B1o-UML)/UML/Mastermind_UML.png>)

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
