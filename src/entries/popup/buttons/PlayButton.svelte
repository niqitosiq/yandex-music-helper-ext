<script>
  import Pause from './icons/Pause.svg';
  import Play from './icons/Play.svg';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let currentState;

  const click = () => {
    dispatch('click');
  };
</script>

<button class="playButton" on:click={click}>
  {#if currentState === 'playing'}
    <Pause width="15" height="15" />
  {:else}
    <Play width="15" height="15" />
  {/if}
</button>

<style>
  .playButton {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
