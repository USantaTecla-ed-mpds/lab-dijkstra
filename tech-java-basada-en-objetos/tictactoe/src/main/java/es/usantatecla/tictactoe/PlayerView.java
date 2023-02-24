package es.usantatecla.tictactoe;

class PlayerView {

    private Color color;
	private Board board;

    public PlayerView(Color color, Board board){
        this.color = color;
		this.board = board;

    }

    public void writeWinner() {
		Message.PLAYER_WIN.writeln(this.color.name());
	}

    public Color getColor() {
        return this.color;
    }

    public Board getBoard() {
        return this.board;
    }


}