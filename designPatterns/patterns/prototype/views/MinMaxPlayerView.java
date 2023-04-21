package views;

import models.MinMaxPlayer;
import utils.Console;

public class MinMaxPlayerView extends PlayerView{

    public int getColumn() {
        Message.TURN.write();
        new Message(new ColorView(this.player.getColor()).toString()).writeln();
        int column = ((MinMaxPlayer) this.player).getColumn();
        Message.RANDOM_COLUMN.write();
        Console.getInstance().writeln(column + 1);
        return column;
    }
}