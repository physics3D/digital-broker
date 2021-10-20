<script lang="ts">
  import type { Stock } from "../stores/stores";
  import {
    getSign,
    getTextColor,
    roundToTwoDigits,
    stockToAPIStock,
  } from "../util/util";

  export let stock: Stock;
  export let onClickSell;
  export let onClickDetails;

  let profit: number;
  let profitPercentage: number;

  $: {
    profit = roundToTwoDigits(stock.currentPrice - stock.priceAtBuy);

    profitPercentage = roundToTwoDigits((profit / stock.priceAtBuy) * 100);
  }
</script>

<div
  class="shadow-lg border rounded-lg p-3 m-3 inline-flex flex-col items-center"
>
  <p>{stock.count}x {stock.name}</p>
  <p>{stock.currentPrice}$</p>
  <div class="flex flex-row justify-center">
    <p class={"m-1 p-1 " + getTextColor(profit)}>
      {getSign(profit) + profit}$
    </p>
    <p class={"m-1 p-1 " + getTextColor(profitPercentage)}>
      {getSign(profitPercentage) + profitPercentage}%
    </p>
  </div>
  <div class="flex flex-row">
    <button on:click={onClickDetails(stockToAPIStock(stock))}>Details</button>
    <button on:click={onClickSell(stock)}>Sell</button>
  </div>
</div>
