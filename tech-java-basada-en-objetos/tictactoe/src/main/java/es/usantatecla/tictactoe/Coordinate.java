package es.usantatecla.tictactoe;

class Coordinate {

	private static final int DIMENSION = 3;
	private CoordinateBasic coordinate;
	
	public static int getDimension() {
		return Coordinate.DIMENSION;
	}

	public Coordinate() {
		this.coordinate=new CoordinateBasic();
	}

	public Coordinate(int row, int column) {
		this.coordinate=new CoordinateBasic(row,column);
	}

	public Direction getDirection(Coordinate coordinate) {
		assert coordinate != null;

		if (this.equals(coordinate)) {
			return Direction.NULL;
		}
		if (this.inHorizontal(coordinate)) {
			return Direction.HORIZONTAL;
		}
		if (this.inVertical(coordinate)) {
			return Direction.VERTICAL;
		}
		if (this.inMainDiagonal() && coordinate.inMainDiagonal()) {
			return Direction.MAIN_DIAGONAL;
		}
		if (this.inInverseDiagonal() && coordinate.inInverseDiagonal()) {
			return Direction.INVERSE_DIAGONAL;
		}
		return Direction.NULL;
	}

	private boolean inHorizontal(Coordinate coordinate) {
		if (coordinate == null) {
			return false;
		}
		return this.coordinate.getRow() == coordinate.getRow();
	}

	private boolean inVertical(Coordinate coordinate) {
		if (coordinate == null) {
			return false;
		}
		return this.getColumn() == coordinate.getColumn();
	}

	private boolean inMainDiagonal() {
		return this.getRow() - this.getColumn() == 0;
	}

	private boolean inInverseDiagonal() {
		return this.getRow() + this.getColumn() == Coordinate.DIMENSION - 1;
	}

	public void read(String title) {
		BoundedIntDialog boundedIntDialog = new BoundedIntDialog(1, Coordinate.getDimension());
		new Console().writeln(title); 
		
    this.coordinate.setRow(boundedIntDialog.read(Message.ROW.toString()) - 1);
		this.coordinate.setColumn(boundedIntDialog.read(Message.COLUMN.toString()) - 1);
	}

	public String getErrorMessage() {
		return Error.WRONG_COORDINATES.toString();
	}

	public int getRow() {
		return this.coordinate.getRow();
	}

	public int getColumn() {
		return this.coordinate.getColumn();
	}

	public boolean equals(Coordinate coordinate) {
		if (this == coordinate)
			return true;
		if (coordinate == null)
			return false;
		if (this.coordinate.getColumn() != coordinate.getColumn())
			return false;
		if (this.coordinate.getRow() != coordinate.getRow())
			return false;
		return true;
	}

}
