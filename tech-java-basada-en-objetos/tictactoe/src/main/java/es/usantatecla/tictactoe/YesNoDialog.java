package es.usantatecla.tictactoe;



class YesNoDialog {

	private String answer;
	private YesNoDialogView view;

	public YesNoDialog() {
		this.view = new YesNoDialogView();
	}

	public void read(String message) {
		assert message != null;

		
		boolean ok;
		do {
			this.view.write(message);
			this.answer = view.read(Message.YES_NO_SUFFIX.toString());
			ok = this.isAffirmative() || this.isNegative();
			if (!ok) {
				this.view.writeln(Message.YES_NO_ERROR.toString());
			}
		} while (!ok);
	}

	public boolean isAffirmative() {
		return this.getAnswer() == Message.AFFIRMATIVE;
	}

	private char getAnswer() {
		return Character.toLowerCase(this.answer.charAt(0));
	}

	public boolean isNegative() {
		return this.getAnswer() == Message.NEGATIVE;
	}

}
