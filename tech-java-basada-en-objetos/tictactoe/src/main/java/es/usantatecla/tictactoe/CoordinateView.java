package es.usantatecla.tictactoe;

class CoordinateView {

	
	public CoordinateView() {		
	}
	

	public int[] read(String title) {
        
		BoundedIntDialog boundedIntDialog = new BoundedIntDialog(1, Coordinate.getDimension());
		new Console().writeln(title);        
        int coordinates[]=new int [2];
        coordinates[0] = boundedIntDialog.read(Message.COLUMN.toString()) - 1;		
        coordinates[1] = boundedIntDialog.read(Message.ROW.toString()) - 1;
        return coordinates;
		
	}

	

}