package views;

import java.util.HashMap;

import models.Player;
import models.PlayerType;

class PlayerViewPrototype {

    private HashMap<PlayerType, PlayerView> playerViewAsoc;

    PlayerViewPrototype() {
        this.playerViewAsoc = new HashMap<>();
        this.playerViewAsoc.put(PlayerType.HUMAN, new HumanPlayerView());
        this.playerViewAsoc.put(PlayerType.RANDOM, new RandomPlayerView());
        this.playerViewAsoc.put(PlayerType.AI, new MinMaxPlayerView());
    }

    PlayerView createView(Player player) {
        PlayerView playerView = this.playerViewAsoc.get(player.getType());
        playerView.setPlayer(player);
        return playerView;
    }

}
