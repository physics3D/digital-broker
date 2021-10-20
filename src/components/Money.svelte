<script lang="ts">
  import { getSign, getTextColor, roundToTwoDigits } from "../util/util";

  import { gameState, GameState } from "../stores/stores";

  let gameStateCopy: GameState;
  let totalMoney: number;
  let profit: number;
  let profitPercentage: number;

  gameState.subscribe((value) => (gameStateCopy = value));

  $: {
    totalMoney =
      gameStateCopy.money +
      gameStateCopy.stocks
        .map((stock) => stock.currentPrice * stock.count)
        .reduce((a, b) => a + b, 0); // sum
    totalMoney = roundToTwoDigits(totalMoney);

    profit = roundToTwoDigits(totalMoney - gameStateCopy.startMoney);

    profitPercentage = roundToTwoDigits(
      (profit / gameStateCopy.startMoney) * 100
    );
  }
</script>

<div>
  <h1 class="text-center text-4xl font-light">
    {totalMoney}$
  </h1>
  <div class="flex flex-row justify-center">
    <h2 class={getTextColor(profit)}>
      {getSign(profit) + profit}$
    </h2>
    <h2 class={getTextColor(profitPercentage)}>
      {getSign(profitPercentage) + profitPercentage}%
    </h2>
  </div>

  <p class="text-center text-xl font-light">
    Capital: {gameStateCopy.money}$
  </p>
</div>
