package es.usantatecla.tictactoe;

class BoundedIntDialogView {
	

	public BoundedIntDialogView() {	
	}

	public int read(String message) {
		assert message != null;		
		return Console.getInstance().readInt(message);
	}

    public void writeln(String message) {
        Console.getInstance().writeln(Message.BOUNDED_INT_ERROR.toString());

    }

	
	}
