<script lang="ts">
  import type { APIStock } from "../api/api";

  import StockBuyView from "../components/StockBuyView.svelte";
  import StockDetailView from "../components/StockDetailView.svelte";
  import StockSearch from "../components/StockSearch.svelte";
  import { GameState, gameState, Stock } from "../stores/stores";
  import StockView from "../components/StockView.svelte";
  import StockSellView from "../components/StockSellView.svelte";

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
  let sellStock: Stock;

  function onClickStock(stock: APIStock) {
    detailedStock = stock;
  }

  function onClickBuy() {
    buyStock = detailedStock;
    detailedStock = undefined;
  }

  function onBuyStock() {
    buyStock = undefined;
  }

  function onClickSell(stock: Stock) {
    sellStock = stock;
  }

  function onSellStock() {
    sellStock = undefined;
  }
</script>

<main>
  <h1>Digital Broker</h1>
  <h2>Money: {gameStateCopy.money}$</h2>

  <h2>Stocks:</h2>
  {#each gameStateCopy.stocks as stock}
    <StockView {stock} {onClickSell} onClickDetails={onClickStock} />
  {/each}

  <StockSearch {onClickStock} />

  {#if detailedStock !== undefined}
    <StockDetailView stock={detailedStock} {onClickBuy} />
  {/if}

  {#if buyStock !== undefined}
    <StockBuyView stock={buyStock} {onBuyStock} />
  {/if}

  {#if sellStock !== undefined}
    <StockSellView stock={sellStock} {onSellStock} />
  {/if}

  <form on:submit|preventDefault={resetGame}>
    <button type="submit">Reset the Game</button>
  </form>
</main>
