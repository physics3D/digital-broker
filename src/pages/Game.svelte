<script lang="ts">
  import Stock from "../components/Stock.svelte";
  import StockSearch from "../components/StockSearch.svelte";
  import { GameState, gameState } from "../stores/stores";

  let gameStateCopy: GameState;

  gameState.subscribe((value) => {
    gameStateCopy = value;
  });

  function resetGame() {
    gameState.set({
      gameStarted: false,
      money: 50000,
      stocks: [],
    });
  }
</script>

<main>
  <h1>The Game</h1>
  <h2>Money: {gameStateCopy.money}</h2>

  <h2>Stocks:</h2>
  {#each gameStateCopy.stocks as stock}
    <Stock {stock} />
  {/each}

  <StockSearch />

  <form on:submit|preventDefault={resetGame}>
    <button type="submit">Reset the Game</button>
  </form>
</main>
