package es.usantatecla.tictactoe;

class BoardView{
    private Color[][] colors;

    public BoardView() {
        this.colors = new Color[Coordinate.getDimension()][Coordinate.getDimension()];

    }

    public Color getColor(Coordinate coordinate) {
		assert coordinate != null;
		return this.colors[coordinate.getRow()][coordinate.getColumn()];
	}

    public void setColor(Color[][] colors) {
        this.colors=colors;
    }

   
    public void reset() {
		for (int i = 0; i < Coordinate.getDimension(); i++) {
			for (int j = 0; j < Coordinate.getDimension(); j++) {
				this.colors[i][j] = Color.NULL;
			}
		}
	}

    public void putToken(Coordinate coordinate, Color color) {
		assert coordinate != null;

		this.colors[coordinate.getRow()][coordinate.getColumn()] = color;
	}

	public void moveToken(Coordinate origin, Coordinate target) {
		assert origin != null && !this.isEmpty(origin);
		assert target != null && this.isEmpty(target);
		assert !origin.equals(target);

		Color color = getColor(origin);
		this.putToken(origin, Color.NULL);
		this.putToken(target, color);
	}

    public boolean isOccupied(Coordinate coordinate, Color color) {
		return this.getColor(coordinate) == color;
	}

	public boolean isEmpty(Coordinate coordinate) {
		return this.isOccupied(coordinate, Color.NULL);
	}


    public void write() {
		Message.HORIZONTAL_LINE.writeln();
		for (int i = 0; i < Coordinate.getDimension(); i++) {
			Message.VERTICAL_LINE.write();
			for (int j = 0; j < Coordinate.getDimension(); j++) {
				this.getColor(new Coordinate(i, j)).write();
				Message.VERTICAL_LINE.write();
			}
			Console.getInstance().writeln();
		}
		Message.HORIZONTAL_LINE.writeln();
	}

}