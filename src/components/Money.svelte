<script lang="ts">
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

    profit = totalMoney - gameStateCopy.startMoney;
    profitPercentage = (profit / gameStateCopy.startMoney) * 100;
  }
</script>

<div>
  <h1 class="text-center text-4xl font-light">{totalMoney}$</h1>
  <div class="flex flex-row justify-center">
    <h2>{profit}$</h2>
    <h2>{profitPercentage}%</h2>
  </div>

  <p class="text-center text-xl font-light">
    Capital: {gameStateCopy.money}$
  </p>
</div>
