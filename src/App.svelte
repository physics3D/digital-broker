<script lang="ts">
  import Game from "./pages/Game.svelte";

  import Setup from "./pages/Setup.svelte";
  import { GameState, gameState, initStores } from "./stores/stores";

  initStores();

  let gameStateCopy: GameState;

  gameState.subscribe((value) => {
    gameStateCopy = value;
  });
</script>

<main>
  {#if gameStateCopy.gameStarted}
    <Game />
  {:else}
    <Setup />
  {/if}
</main>
