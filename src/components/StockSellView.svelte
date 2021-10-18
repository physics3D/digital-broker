<script lang="ts">
  import { gameState, GameState, Stock } from "../stores/stores";
  import StockPriceWidget from "./StockPriceWidget.svelte";
  import Window from "./Window.svelte";

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

<Window closeable onClose={onSellClose}>
  <h2>{stock.name}</h2>

  <StockPriceWidget symbol={stock.symbol} />

  <p>Price at buy: {stock.priceAtBuy}</p>
  <p>Current price: {stock.currentPrice}$</p>

  {#if cantSellSoManyStocks}
    <p>You don't have so many stocks!</p>
  {/if}

  <input type="range" min="1" max={stock.count} bind:value={stockSellCount} />
  <input type="number" min="1" max={stock.count} bind:value={stockSellCount} />

  <p>Money after the sell: {moneyAfterSell}</p>

  <button disabled={cantSellSoManyStocks} on:click={sellStock}>Sell</button>
</Window>
