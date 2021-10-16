<script lang="ts">
  import type { APIStock } from "src/api/api";

  import type { Stock } from "src/stores/stores";

  export let stock: Stock;
  export let onClickSell;
  export let onClickDetails;

  function stockToAPIStock(stockToConvert: Stock): APIStock {
    return {
      description: stock.name,
      symbol: stock.symbol,
      displaySymbol: stock.symbol,
      type: "Common Stock",
    };
  }
</script>

<main>
  <p>{stock.count}x {stock.name}</p>
  <p>Price at buy: {stock.priceAtBuy}$</p>
  <p>Price now: {stock.currentPrice}$</p>
  <button on:click={onClickDetails(stockToAPIStock(stock))}>Details</button>
  <button on:click={onClickSell(stock)}>Sell</button>
</main>
