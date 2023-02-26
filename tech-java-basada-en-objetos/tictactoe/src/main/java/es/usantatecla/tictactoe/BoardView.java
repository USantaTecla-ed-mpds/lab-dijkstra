package es.usantatecla.tictactoe;

class BoardView {



	public BoardView() {
		
	}
	
	
	public void write( Color[][] colors) {
		Message.HORIZONTAL_LINE.writeln();
		for (int i = 0; i < Coordinate.getDimension(); i++) {
			Message.VERTICAL_LINE.write();
			for (int j = 0; j < Coordinate.getDimension(); j++) {
                colors[i][j].write();				
				Message.VERTICAL_LINE.write();
			}
			Console.getInstance().writeln();
		}
		Message.HORIZONTAL_LINE.writeln();
	}

}