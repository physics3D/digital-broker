<script lang="ts">
  import { GameState, gameState } from "../stores/stores";

  let gameStateCopy: GameState;

  gameState.subscribe((value) => {
    gameStateCopy = value;
  });

  let startMoney: number = 50000;

  function startGame() {
    gameState.set({
      gameStarted: true,
      money: startMoney,
      stocks: [],
    });
  }
</script>

<main>
  <form on:submit|preventDefault={startGame}>
    <p>How much money do you want to start with?</p>
    <input type="number" bind:value={startMoney} />
    <button type="submit">Start Trading!</button>
  </form>
</main>
