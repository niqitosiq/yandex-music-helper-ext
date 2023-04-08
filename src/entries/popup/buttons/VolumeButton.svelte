<script>
  import VolumeHigh from './icons/VolumeHigh.svg';
  import VolumeMedium from './icons/VolumeMedium.svg';

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let currentVolume;

  const toggle = () => {
    dispatch('toggle');
  };
</script>

<button class="volume" on:click={toggle}>
  {#if currentVolume <= 0.4}
    <VolumeMedium width="15" height="15" />
  {:else}
    <VolumeHigh width="15" height="15" />
  {/if}
</button>

<style>
  .volume {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }
</style>
