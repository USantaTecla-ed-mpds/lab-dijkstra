package es.usantatecla.tictactoe;

class Player {

	
	private PlayerView view;
	

	public Player(Color color, Board board) {
		assert !color.isNull();
		assert board != null;
		
		this.view = new PlayerView(color,board);
	
	}

	public void play() {
		if (!this.view.getBoard().isComplete(view.getColor())) {
			this.putToken();
		} else {
			this.moveToken();
		}
	}

	private void putToken() {
		Message.TURN.writeln(this.view.getColor().name());
		Coordinate coordinate;
		Error error;
		do {
			coordinate = this.getCoordinate(Message.ENTER_COORDINATE_TO_PUT);
			error = this.getPutTokenError(coordinate);
		} while (!error.isNull());
		this.view.getBoard().view.putToken(coordinate, this.view.getColor());
	}

	private Coordinate getCoordinate(Message message) {
		assert message != null;

		Coordinate coordinate = new Coordinate();
		coordinate.read(message.toString());
		return coordinate;
	}

	private Error getPutTokenError(Coordinate coordinate) {
		assert coordinate != null;

		Error error = Error.NULL;
		if (!this.view.getBoard().view.isEmpty(coordinate)) {
			error = Error.NOT_EMPTY;
		}
		error.writeln();
		return error;
	}

	private void moveToken() {
		Message.TURN.writeln(this.view.getColor().name());
		Coordinate origin;
		Error error;
		do {
			origin = this.getCoordinate(Message.COORDINATE_TO_REMOVE);
			error = this.getOriginMoveTokenError(origin);
		} while (error != Error.NULL);
		Coordinate target;
		do {
			target = this.getCoordinate(Message.COORDINATE_TO_MOVE);
			error = this.getTargetMoveTokenError(origin, target);
		} while (error != Error.NULL);
		this.view.getBoard().view.moveToken(origin, target);
	}

	private Error getOriginMoveTokenError(Coordinate origin) {
		assert origin != null;

		Error error = Error.NULL;
		if (!this.view.getBoard().view.isOccupied(origin, this.view.getColor())) {
			error = Error.NOT_OWNER;
		}
		error.writeln();
		return error;
	}

	private Error getTargetMoveTokenError(Coordinate origin, Coordinate target) {
		assert origin != null;
		assert target != null;

		Error error = Error.NULL;
		if (origin.equals(target)) {
			error = Error.SAME_COORDINATES;
		} else if (!this.view.getBoard().view.isEmpty(target)) {
			error = Error.NOT_EMPTY;
		}
		error.writeln();
		return error;
	}


	public Color getColor() {
		return this.view.getColor();
	}

	public PlayerView getView() {
		return this.view;
	}

}
