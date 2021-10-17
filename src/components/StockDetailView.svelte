<script lang="ts">
  import { APIStock, getStockPrice } from "../api/api";
  import StockPriceWidget from "./StockPriceWidget.svelte";

  export let stock: APIStock;
  export let onClickBuy;
  export let onDetailClose;

  let currentPrice: number;
  getStockPrice(stock.symbol).then((price) => (currentPrice = price));
</script>

<div
  class="fixed w-full h-full left-0 top-0 bg-opacity-75 bg-black flex justify-center items-center"
>
  <div
    class="bg-opacity-100 bg-white shadow-lg border rounded-lg p-3 m-3 flex flex-col"
  >
    <button on:click={onDetailClose}>x</button>
    <h2>{stock.description}</h2>
    <StockPriceWidget symbol={stock.symbol} />

    <h2>Current price: {currentPrice}$</h2>

    <button
      on:click={onClickBuy}
      class="block mx-auto my-2 px-4 border rounded-full shadow p-2 bg-gray-400"
      >Buy</button
    >
  </div>
</div>
