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

<div class="card">
  <h2>Buy stocks:</h2>
  <input type="text" bind:value={stockQuery} />

  {#await stockListPromise}
    <p>Downloading a list of available stocks...</p>
  {:catch}
    <p>Failed. Please check your internet connection.</p>
  {/await}

  <table>
    {#each foundStocks as stock}
      <tr>
        <td>
          <!-- undo the default styling for this button -->
          <button
            on:click={onClickStock(stock)}
            class="bg-white shadow-none border-none m-auto p-0 active:bg-white"
          >
            {stock.description}
          </button>
        </td>
      </tr>
    {/each}
  </table>
</div>
