<script lang="ts">
  import { APIStock, getStockPrice, getWidgetURL } from "../api/api";
  import { gameState, GameState } from "../stores/stores";

  export let stock: APIStock;
  export let onBuyClose;

  let gameStateCopy: GameState;
  gameState.subscribe((value) => (gameStateCopy = value));

  let currentPrice: number;
  getStockPrice(stock.symbol).then((price) => (currentPrice = price));

  let numberOfStocks: number = 1;
  let totalMoney: number;
  let moneyLeft: number;
  let cantBuyStocks: boolean;

  $: {
    totalMoney = numberOfStocks * currentPrice;
    moneyLeft = gameStateCopy.money - totalMoney;
    cantBuyStocks = totalMoney > gameStateCopy.money;
  }

  function buyStock() {
    let localGameState = gameStateCopy;
    localGameState.money -= totalMoney;
    localGameState.stocks.push({
      symbol: stock.symbol,
      name: stock.description,
      priceAtBuy: currentPrice,
      currentPrice: currentPrice,
      count: numberOfStocks,
    });

    gameState.set(localGameState);

    onBuyClose();
  }
</script>

<div
  class="fixed w-full h-full left-0 top-0 bg-opacity-75 bg-black flex justify-center items-center"
>
  <div
    class="bg-opacity-100 bg-white shadow-lg border rounded-lg p-3 m-3 flex flex-col items-center"
  >
    <button on:click={onBuyClose}>x</button>
    <h2>{stock.description}</h2>
    <h2>Current price: {currentPrice}$</h2>

    {#if cantBuyStocks}
      <p>You don't have enough money to buy so many stocks.</p>
    {/if}

    <input
      type="range"
      min="1"
      max={Math.floor(gameStateCopy.money / currentPrice)}
      bind:value={numberOfStocks}
    />
    <input
      type="number"
      min="1"
      max={Math.floor(gameStateCopy.money / currentPrice)}
      bind:value={numberOfStocks}
    />

    <p>Total cost: {totalMoney}$</p>
    <p>Money left after the purchase: {moneyLeft}$</p>

    <button
      disabled={cantBuyStocks}
      on:click={buyStock}
      class="block mx-auto my-2 px-4 self-center border rounded-full shadow p-2 bg-gray-400"
      >Buy</button
    >
  </div>
</div>
