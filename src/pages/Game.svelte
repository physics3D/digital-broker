<script lang="ts">
  import type { APIStock } from "../api/api";

  import StockBuyView from "../components/StockBuyView.svelte";
  import StockDetailView from "../components/StockDetailView.svelte";
  import StockSearch from "../components/StockSearch.svelte";
  import { GameState, gameState, Stock } from "../stores/stores";
  import StockView from "../components/StockView.svelte";
  import StockSellView from "../components/StockSellView.svelte";
  import Money from "../components/Money.svelte";

  let gameStateCopy: GameState;

  gameState.subscribe((value) => {
    gameStateCopy = value;
  });

  function resetGame() {
    gameState.set({
      gameStarted: false,
      money: 50000,
      startMoney: 50000,
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

  function onDetailClose() {
    detailedStock = undefined;
  }

  function onBuyClose() {
    buyStock = undefined;
  }

  function onClickSell(stock: Stock) {
    sellStock = stock;
  }

  function onSellClose() {
    sellStock = undefined;
  }
</script>

<div class="flex flex-col items-center">
  <h1 class="text-center text-4xl font-light m-2">Digital Broker</h1>
  <div class="card">
    <Money />

    <h2>Stocks:</h2>
    <div class="flex flex-col lg:flex-row lg:flex-wrap">
      {#if gameStateCopy.stocks.length > 0}
        {#each gameStateCopy.stocks as stock}
          <StockView {stock} {onClickSell} onClickDetails={onClickStock} />
        {/each}
      {:else}
        <p>You haven't bought any stocks yet.</p>
      {/if}
    </div>
  </div>

  <StockSearch {onClickStock} />

  <form on:submit|preventDefault={resetGame}>
    <button type="submit">Reset the Game</button>
  </form>
</div>

{#if detailedStock !== undefined}
  <StockDetailView stock={detailedStock} {onClickBuy} {onDetailClose} />
{/if}

{#if buyStock !== undefined}
  <StockBuyView stock={buyStock} {onBuyClose} />
{/if}

{#if sellStock !== undefined}
  <StockSellView stock={sellStock} {onSellClose} />
{/if}
