package es.usantatecla.tictactoe;

public class MessageView {



	public void write(String message) {
		Console.getInstance().write(message);
	}

	public void writeln(String message) {
		Console.getInstance().writeln(message);
	}
	

	
}