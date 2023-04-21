package views;

import models.Player;

public abstract class PlayerView {
    
    protected Player player;

    public void setPlayer(Player player) {
        this.player = player;
    }

    public void writeWinner() {
        String message = new ColorView(this.player.getColor()).toString() + Message.PLAYER_WIN.toString();
        new Message(message).writeln();
    }

    public abstract int getColumn();

    public Player getPlayer() {
        return this.player;
    }

}
