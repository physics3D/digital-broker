<script lang="ts">
  export let closeable: boolean = true;
  export let onClose = () => {};
</script>

<div
  class="fixed w-full h-full left-0 top-0 bg-opacity-75 bg-black flex justify-center items-center"
>
  <div class="bg-opacity-100 bg-white card flex flex-col w-11/12 h-5/6">
    {#if closeable}
      <button on:click={onClose} class="ml-auto undecorated-button">x</button>
    {/if}

    <slot />
  </div>
</div>
