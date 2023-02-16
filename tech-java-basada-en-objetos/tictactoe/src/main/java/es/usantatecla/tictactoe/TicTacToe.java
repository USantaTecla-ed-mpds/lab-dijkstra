package es.usantatecla.tictactoe;

class TicTacToe {

	private Board board;
	private Turn turn;

	private TicTacToe() {
		this.board = new Board();
		this.turn = new Turn(this.board);
	}

	private void play() {
		do {
			this.playGame();
		} while (this.isResumedGame());
	}

	private void playGame() {
		Message.TITLE.writeln();
		this.board.write();
		do {
			this.turn.play();
			this.board.write();
		} while (!this.board.isTicTacToe(this.turn.getActiveColor()));
		this.turn.writeWinner();
	}

	private boolean isResumedGame() {	
		
		Console console = Console.getInstance();
		boolean ok;
		String answer;

		boolean ret=false; 	

		do {			
			console.write(Message.RESUME.toString());
			answer = console.readString(Message.YES_NO_SUFFIX.toString());			
			ok = answer.equals(String.valueOf(Message.AFFIRMATIVE)) || answer.equals(String.valueOf(Message.NEGATIVE));			 
			if (!ok) {
				console.writeln(Message.YES_NO_ERROR.toString());
			}
		} while (!ok);
		
		if (answer.equals(String.valueOf(Message.AFFIRMATIVE))) { 
			ret=true;
			this.board.reset();
			this.turn.reset();
		}

		return ret;
		
	}

	public static void main(String[] args) {
		new TicTacToe().play();
	}

	// Add YesNoDialog

}
