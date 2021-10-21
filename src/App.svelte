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
<footer
  class="fixed left-0 right-0 bottom-0 bg-gray-400 text-black text-center"
>
  <p>
    See the source code on <a
      href="https://github.com/physics3D/digital-broker"
      class="underline text-blue-900"
      target="_blank">Github</a
    >
  </p>
</footer>
