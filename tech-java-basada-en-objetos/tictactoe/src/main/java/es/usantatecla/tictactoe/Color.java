package es.usantatecla.tictactoe;

enum Color {

	X,
	O,
	NULL;

	private ColorView view = new ColorView();

	public static Color get(int ordinal) {
		assert new ClosedInterval(0, Color.NULL.ordinal()-1).isIncluded(ordinal);
	
 		return Color.values()[ordinal];
	}

	public void write() {
		String string = this.name();
		if (this.isNull()) {
			string = Message.NULL_COLOR.toString();
		}
		this.view.write(string);
	}

	public boolean isNull() {
		return this == Color.NULL;
	}
}
