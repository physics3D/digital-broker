<script lang="ts">
  export let closeable: boolean = true;
  export let onClose = () => {};

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<div
  class="fixed w-full h-full left-0 top-0 bg-opacity-75 bg-black flex justify-center items-center"
>
  <div class="bg-opacity-100 bg-white card flex flex-col w-11/12 h-5/6">
    {#if closeable}
      <button
        on:click={onClose}
        class="bg-white shadow-none border-none p-0 ml-auto active:bg-white"
        >x</button
      >
    {/if}

    <slot />
  </div>
</div>
