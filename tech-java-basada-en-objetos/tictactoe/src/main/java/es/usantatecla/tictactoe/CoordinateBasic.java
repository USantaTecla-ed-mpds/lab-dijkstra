package es.usantatecla.tictactoe;

class CoordinateBasic {

	
	private int row;
	private int column;

	
	public CoordinateBasic() {
	}

	public CoordinateBasic(int row, int column) {
		this.row = row;
		this.column = column;
	}


	public int getRow() {
		return this.row;
	}

	public int getColumn() {
		return this.column;
	}

    public void setRow(int row) {
		this.row=row;
	}

	public void setColumn(int column) {
		this.column=column;
	}

	public boolean equals(CoordinateBasic coordinate) {
		if (this == coordinate)
			return true;
		if (coordinate == null)
			return false;
		if (this.column != coordinate.column)
			return false;
		if (this.row != coordinate.row)
			return false;
		return true;
	}

}
