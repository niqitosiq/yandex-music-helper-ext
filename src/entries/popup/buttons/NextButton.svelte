<script>
  import Next from './icons/Next.svg';

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const click = () => {
    dispatch('click');
  };
</script>

<button class="nextButton" on:click={click}>
  <Next width="15" height="15" />
</button>

<style>
  .nextButton {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
