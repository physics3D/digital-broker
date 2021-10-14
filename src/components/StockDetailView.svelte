<script lang="ts">
  import { APIStock, getStockPrice, getWidgetURL } from "../api/api";

  export let stock: APIStock;
  export let onClickBuy;

  let currentPrice: number;
  getStockPrice(stock.symbol).then((price) => (currentPrice = price));
</script>

<main>
  <h2>{stock.description}</h2>
  <iframe
    title={stock.symbol}
    src={getWidgetURL(stock.symbol)}
    frameborder="0"
  />

  <h2>Current price: {currentPrice}$</h2>

  <button on:click={onClickBuy}>Buy</button>
</main>
