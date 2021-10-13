<script lang="ts">
  import type { Stock } from "../stores/stores";

  export let stock: Stock;
</script>

<main>
  <p>{stock.name}</p>
  <p>Price at buy: {stock.priceAtBuy}$</p>
</main>
