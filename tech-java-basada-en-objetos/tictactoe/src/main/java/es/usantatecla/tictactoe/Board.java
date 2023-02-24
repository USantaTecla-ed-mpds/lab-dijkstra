package es.usantatecla.tictactoe;

class Board {
	public BoardView view;


	public Board() {
		this.view = new BoardView();		
		this.view.reset();
	}

	

  public boolean isComplete(Color color) {
		for(Coordinate coordinate : this.getCoordinates(color)) {
			if (coordinate == null){
				return false;
			}
		}
		return true;
	}
		

	private Coordinate[] getCoordinates(Color color) {
		assert !color.isNull();

		Coordinate[] coordinates = new Coordinate[Coordinate.getDimension()];
		int k = 0;
		for (int i = 0; i < Coordinate.getDimension(); i++) {
			for (int j = 0; j < Coordinate.getDimension(); j++) {
				if (this.view.getColor(new Coordinate(i, j)) == color) {
					coordinates[k] = new Coordinate(i, j);
					k++;
				}
			}
		}
		return coordinates;
	}

	

	

	
	public boolean isTicTacToe(Color color) {
		assert !color.isNull();

		Direction[] directions = this.getDirections(color);
		if (directions.length < Coordinate.getDimension() - 1) {
			return false;
		}
		for (int i = 0; i < directions.length - 1; i++) {
			if (directions[i] != directions[i + 1]) {
				return false;
			}
		}
		return !directions[0].isNull();
	}

	private Direction[] getDirections(Color color) {
		assert !color.isNull();

		Coordinate[] coordinates = this.getCoordinates(color);
		int pairs = 0;
		for (int i = 1; i < coordinates.length; i++) {
			if (coordinates[i] != null) {
				pairs++;
			}
		}
		Direction[] directions = new Direction[pairs];
		for (int i = 0; i < directions.length; i++) {
			directions[i] = coordinates[i].getDirection(coordinates[i + 1]);
		}
		return directions;
	}



}

