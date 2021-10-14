<script lang="ts">
  import type { Stock } from "../stores/stores";

  export let stock: Stock;
  export let onClickSell;
</script>

<main>
  <p>{stock.count}x {stock.name}</p>
  <p>Price at buy: {stock.priceAtBuy}$</p>
  <p>Price now: {stock.currentPrice}$</p>
  <button on:click={onClickSell(stock)}>Sell</button>
</main>
