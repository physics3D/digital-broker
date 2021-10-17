<script lang="ts">
  import { APIStock, getStocksList as getStockList } from "../api/api";

  export let onClickStock;

  let stockList: APIStock[] = [];
  let stockListPromise = getStockList().then((json) => {
    stockList = json;
  });
  let stockQuery: string = "";

  let foundStocks: APIStock[];

  $: {
    foundStocks = stockList.filter((stock) =>
      stock.description.startsWith(stockQuery.toUpperCase())
    );

    if (foundStocks.length > 10) {
      foundStocks.length = 10;
    }
  }
</script>

<div class="shadow-lg border rounded-lg items-center container p-3 m-3">
  <h2>Buy stocks:</h2>
  <input
    type="text"
    bind:value={stockQuery}
    class="border outline-none focus:border-blue-300 rounded shadow-sm text-lg px-1"
  />

  {#await stockListPromise}
    <p>Downloading a list of available stocks...</p>
  {:catch}
    <p>Failed. Please check your internet connection.</p>
  {/await}

  <table class="overflow-scroll">
    {#each foundStocks as stock}
      <tr>
        <td>
          <button on:click={onClickStock(stock)}>
            {stock.description}
          </button>
        </td>
      </tr>
    {/each}
  </table>
</div>
