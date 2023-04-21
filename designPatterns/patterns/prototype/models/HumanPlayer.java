package models;

public class HumanPlayer extends Player {
    public HumanPlayer(Color color, Board board) {
        super(color, board);
        this.type = PlayerType.HUMAN;
    }
}
