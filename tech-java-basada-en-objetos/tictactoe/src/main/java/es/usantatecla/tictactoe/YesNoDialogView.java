package es.usantatecla.tictactoe;



class YesNoDialogView {

	
    private Console console;

    public YesNoDialogView() {
        this.console = Console.getInstance();
    }

	public String read(String message) {
		assert message != null;		
		return console.readString(message);	
	}

    public void write(String message) {
		assert message != null;
		this.console.write(message);
	}

    public void writeln(String message) {
		assert message != null;
		this.console.writeln(message);
	}

	
}