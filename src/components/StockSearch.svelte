<script lang="ts">
  import { APIStock, getStocksList as getStockList } from "../api/api";

  let stockList: APIStock[] = [];
  getStockList().then((json) => {
    stockList = JSON.parse(json);
  });
  let stockQuery: string = "";

  let foundStocks: APIStock[];

  $: {
    if (stockQuery == "") {
      foundStocks = [];
    } else {
      foundStocks = stockList.filter((stock) =>
        stock.description.startsWith(stockQuery.toUpperCase())
      );

      if (foundStocks.length > 10) {
        foundStocks.length = 10;
      }
    }
  }
</script>

<main>
  <h2>Buy stocks:</h2>
  <input type="text" bind:value={stockQuery} />

  <table>
    {#each foundStocks as stock}
      <tr>
        <td>{stock.description}</td>
      </tr>
    {/each}
  </table>
</main>
