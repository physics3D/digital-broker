<script lang="ts">
  import { gameState, GameState, Stock } from "../stores/stores";
  import StockPriceWidget from "./StockPriceWidget.svelte";

  export let stock: Stock;
  export let onSellClose;

  let gameStateCopy: GameState;
  gameState.subscribe((value) => (gameStateCopy = value));

  let stockSellCount: number = 1;
  let moneyAfterSell: number;
  let cantSellSoManyStocks: boolean;

  $: {
    cantSellSoManyStocks = stockSellCount > stock.count;
    moneyAfterSell = gameStateCopy.money + stockSellCount * stock.currentPrice;
  }

  function sellStock() {
    let localGameState = gameStateCopy;
    localGameState.money += stockSellCount * stock.currentPrice;

    if (stock.count === stockSellCount) {
      localGameState.stocks.splice(localGameState.stocks.indexOf(stock), 1);
    } else {
      localGameState.stocks[localGameState.stocks.indexOf(stock)].count -=
        stockSellCount;
    }

    gameState.set(localGameState);

    onSellClose();
  }
</script>

<div
  class="fixed w-full h-full left-0 top-0 bg-opacity-75 bg-black flex justify-center items-center"
>
  <div
    class="bg-opacity-100 bg-white shadow-lg border rounded-lg p-3 m-3 flex flex-col items-center"
  >
    <button on:click={onSellClose}>x</button>
    <h2>{stock.name}</h2>

    <StockPriceWidget symbol={stock.symbol} />

    <p>Price at buy: {stock.priceAtBuy}</p>
    <p>Current price: {stock.currentPrice}$</p>

    {#if cantSellSoManyStocks}
      <p>You don't have so many stocks!</p>
    {/if}

    <input type="range" min="1" max={stock.count} bind:value={stockSellCount} />
    <input
      type="number"
      min="1"
      max={stock.count}
      bind:value={stockSellCount}
    />

    <p>Money after the sell: {moneyAfterSell}</p>

    <button
      disabled={cantSellSoManyStocks}
      on:click={sellStock}
      class="block my-2 px-4 self-center border rounded-full shadow p-2 mx-1 bg-gray-400"
      >Sell</button
    >
  </div>
</div>
