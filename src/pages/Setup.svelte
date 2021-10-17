<script lang="ts">
  import { GameState, gameState } from "../stores/stores";

  let gameStateCopy: GameState;

  gameState.subscribe((value) => {
    gameStateCopy = value;
  });

  let startMoney: number = 50000;

  function startGame() {
    gameState.set({
      gameStarted: true,
      money: startMoney,
      startMoney: startMoney,
      stocks: [],
    });
  }
</script>

<div class="text-center m-4">
  <h1 class="text-xl font-bold">Digital Broker</h1>
  <form on:submit|preventDefault={startGame}>
    <p>How much money do you want to start with?</p>
    <input
      type="number"
      min="0"
      bind:value={startMoney}
      class="border rounded p-1"
    />
    <button
      type="submit"
      class="block mx-auto my-2 self-center border rounded-full shadow p-2 bg-gray-400"
      >Start Trading!</button
    >
  </form>
</div>
