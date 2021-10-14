<script lang="ts">
  import type { APIStock } from "../api/api";
  import StockBuyView from "../components/StockBuyView.svelte";

  import StockDetailView from "../components/StockDetailView.svelte";
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

  let detailedStock: APIStock;
  let buyStock: APIStock;

  function onClickStock(stock: APIStock) {
    detailedStock = stock;
  }

  function onClickBuy() {
    buyStock = detailedStock;
    detailedStock = undefined;
  }

  function onBuyStock() {}
</script>

<main>
  <h1>The Game</h1>
  <h2>Money: {gameStateCopy.money}$</h2>

  <h2>Stocks:</h2>
  {#each gameStateCopy.stocks as stock}
    <p>{stock.name}</p>
    <p>Price at buy: {stock.priceAtBuy}$</p>
  {/each}

  <StockSearch {onClickStock} />

  {#if detailedStock !== undefined}
    <StockDetailView stock={detailedStock} {onClickBuy} />
  {/if}

  {#if buyStock !== undefined}
    <StockBuyView stock={buyStock} {onBuyStock} />
  {/if}

  <form on:submit|preventDefault={resetGame}>
    <button type="submit">Reset the Game</button>
  </form>
</main>
