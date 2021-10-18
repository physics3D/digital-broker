<script lang="ts">
  import { APIStock, getStockPrice } from "../api/api";
  import StockPriceWidget from "./StockPriceWidget.svelte";
  import Window from "./Window.svelte";

  export let stock: APIStock;
  export let onClickBuy;
  export let onDetailClose;

  let currentPrice: number;
  getStockPrice(stock.symbol).then((price) => (currentPrice = price));
</script>

<Window closeable onClose={onDetailClose}>
  <h2>{stock.description}</h2>
  <StockPriceWidget symbol={stock.symbol} />

  <h2>Current price: {currentPrice}$</h2>

  <button on:click={onClickBuy}>Buy</button>
</Window>
