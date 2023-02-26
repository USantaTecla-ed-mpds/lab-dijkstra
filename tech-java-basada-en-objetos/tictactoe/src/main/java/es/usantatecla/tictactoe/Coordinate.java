package es.usantatecla.tictactoe;

class Coordinate {

	private static final int DIMENSION = 3;
	private CoordinateBasic coordinateBasic;
	private CoordinateView view;
	
	public static int getDimension() {
		return Coordinate.DIMENSION;
	}

	public Coordinate() {	
		this.view = new CoordinateView();	
		this.coordinateBasic=new CoordinateBasic();
	}

	public Coordinate(int row, int column) {
		this.view = new CoordinateView();
		this.coordinateBasic=new CoordinateBasic(row,column);
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
		return this.coordinateBasic.getRow() == coordinate.getRow();
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
	final int[] coordinate= view.read(title);
	this.coordinateBasic.setColumn(coordinate[0]);		
    this.coordinateBasic.setRow(coordinate[1]);		
	}

	public String getErrorMessage() {
		return Error.WRONG_COORDINATES.toString();
	}

	public int getRow() {
		return this.coordinateBasic.getRow();
	}

	public int getColumn() {
		return this.coordinateBasic.getColumn();
	}

	public boolean equals(Coordinate coordinate) {
		return this.coordinateBasic.equals(coordinate.coordinateBasic);		
	}

}
