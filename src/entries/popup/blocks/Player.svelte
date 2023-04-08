<script>
  import { createEventDispatcher } from 'svelte';
  import PrevButton from '../buttons/PlayButton.svelte';
  import NextButton from '../buttons/NextButton.svelte';
  import PlayButton from '../buttons/PlayButton.svelte';

  const dispatch = createEventDispatcher();

  export let currentTrack;
  export let currentState;

  const next = () => {
    dispatch('next');
  };

  const toggleState = () => {
    dispatch('toggleState');
  };
</script>

<div class="player">
  <PlayButton {currentState} on:click={toggleState} />
  <span class="title">{currentTrack}</span>
  <NextButton on:click={next} />
</div>

<style>
  .player {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    padding: 0px 15px;
    font-weight: bold;
  }
</style>
