# MasterMind (Diagrama UML)

![Image text](<https://github.com/andresito87/MPDS-EscuelaIT/blob/main/21-js-basadaObjetos/MasterMind/MasterMindv0.3(Dise%C3%B1o-UML)/UML/Mastermind_UML.png>)

```
@startuml
title Mastermind
class Game {
  MAX_ATTEMPS
  play(),
  printResults(),
  isLoser()
}

class YesNoDialog{
question,
answer,
read()
isAfirmative(),
isNegative()
}

class ProposedCombination{
attributesProposedCombination,
proposedCombinations,
readCombination()
isCorrectLenght(),
isCorrectColor(),
isRepeatColor()
}

class SecretCombination{
attributesSecretCombination,
secretCombination,
setSecretCombination()
calculateResult()
isWinner()
}

class Combination{
COLORS,
COMBINATION_LENGTH
}

Game .left.> YesNoDialog
Game *-down-> SecretCombination
Game *-down-> ProposedCombination
SecretCombination -left-> ProposedCombination
ProposedCombination -down-> Combination
SecretCombination -down-> Combination
@enduml
```
