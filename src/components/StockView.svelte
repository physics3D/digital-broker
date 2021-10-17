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

<div class="shadow-lg border rounded-lg p-3 m-3 flex flex-col items-center">
  <p>{stock.count}x {stock.name}</p>
  <p>Price at buy: {stock.priceAtBuy}$</p>
  <p>Price now: {stock.currentPrice}$</p>
  <div class="flex flex-row">
    <button
      on:click={onClickDetails(stockToAPIStock(stock))}
      class="block my-2 px-4 self-center border rounded-full shadow p-2 mx-1  bg-gray-400"
      >Details</button
    >
    <button
      on:click={onClickSell(stock)}
      class="block my-2 px-4 self-center border rounded-full shadow p-2 mx-1 bg-gray-400"
      >Sell</button
    >
  </div>
</div>
