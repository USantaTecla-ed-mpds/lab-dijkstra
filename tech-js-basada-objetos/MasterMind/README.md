# MasterMind (Diagrama UML)

<p align="center">
  <img src="https://github.com/USantaTecla-ed-mpds/lab-dijkstra/blob/master/tech-js-basada-objetos/MasterMind/UML/Mastermind_UML.png">
 </p>

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
