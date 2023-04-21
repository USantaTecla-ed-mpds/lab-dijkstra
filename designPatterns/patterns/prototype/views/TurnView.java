package views;

import models.Turn;
import utils.ClosedIntervalDialog;

public class TurnView {
    private Turn turn;
    private PlayerView activePlayerView;
    private PlayerViewPrototype playerViewPrototype;

    public TurnView(Turn turn) {
        super();
        this.turn = turn;
        this.playerViewPrototype = new PlayerViewPrototype();
    }
    public void getNumberOfHumanPlayers() { 
        ClosedIntervalDialog closedIntervalDialog = new ClosedIntervalDialog(0, this.turn.getNumberPlayers());
        closedIntervalDialog.read(Message.NUM_PLAYERS.toString());
        this.turn.reset(closedIntervalDialog.getAnswer());
    }
    public void getMachineTypePlayer() { 
        ClosedIntervalDialog closedIntervalDialog = new ClosedIntervalDialog(1, 2);
        closedIntervalDialog.read(Message.TYPE_MACHINE.toString());
        this.turn.setTypeMachine(closedIntervalDialog.getAnswer());
    }

    public void play() {
        this.activePlayerView = this.playerViewPrototype.createView(this.turn.getActivePlayer());
        this.turn.play(this.activePlayerView.getColumn());
    }

    public void writeResult() {
        if ((this.turn.getBoard()).isWinner()) {
            this.activePlayerView.writeWinner();
        } else {
            Message.PLAYERS_TIED.writeln();
        }
    }
}
