<script lang="ts">
  import { APIStock, getStockPrice, getWidgetURL } from "../api/api";
  import { gameState, GameState } from "../stores/stores";

  export let stock: APIStock;
  export let onBuyStock;

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
    });

    gameState.set(localGameState);

    onBuyStock();
  }
</script>

<main>
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

  <p>Total money: {totalMoney}$</p>
  <p>Money left after the purchase: {moneyLeft}$</p>

  <button disabled={cantBuyStocks} on:click={buyStock}>Buy</button>
</main>
