<script lang="ts">
  import { getWidgetURL } from "../api/api";

  export let symbol: string;

  let priceWidget;
  let loadingMessage;

  function hideLoadingMessage() {
    loadingMessage.style.display = "none";
  }
</script>

<div class="flex flex-grow">
  <p bind:this={loadingMessage}>Loading price widget...</p>

  <iframe
    title={symbol}
    src={getWidgetURL(symbol)}
    frameborder="0"
    on:load={hideLoadingMessage}
    bind:this={priceWidget}
    class="flex-grow"
  />
</div>
