<script>
  import { onDestroy, onMount } from 'svelte';
  import VolumeButton from '../buttons/VolumeButton.svelte';
  import Player from './Player.svelte';

  let yandexMusicTab = null;
  let currentVolume = null;
  let currentTrack = null;
  let currentState = 'pause';

  function executeScript(code) {
    return browser.tabs.executeScript(yandexMusicTab.id, {
      code,
    });
  }

  async function updateVolume() {
    const [volume] = await executeScript(`window.wrappedJSObject.Mu.Adapter.prototype.getVolume()`);
    currentVolume = volume;
  }

  async function updateState() {
    const [current] = await executeScript(
      `window.wrappedJSObject.Mu.Adapter.prototype.getCurrent()`,
    );
    const [state] = await executeScript(`window.wrappedJSObject.Mu.Adapter.prototype.getState()`);

    const { title } = current;

    currentTrack = title;
    currentState = state;
  }

  let updateStateInterval = null;
  onMount(async () => {
    const tabs = await browser.tabs.query({ currentWindow: true });
    tabs.forEach((tab) => {
      if (tab.url?.startsWith('https://music.yandex.ru')) {
        yandexMusicTab = tab;
      }
    });

    updateVolume();
    updateState();

    updateStateInterval = setInterval(updateState, 1000);
  });

  onDestroy(() => {
    clearInterval(updateStateInterval);
    updateStateInterval = null;
  });

  async function setVolume(targetVolume) {
    await executeScript(`window.wrappedJSObject.Mu.Adapter.prototype.setVolume(${targetVolume})`);
  }

  async function toggleVolume() {
    const targetVolume = currentVolume <= 0.4 ? 1 : 0.4;
    await setVolume(targetVolume);
    updateVolume();
  }

  async function next() {
    await executeScript(`window.wrappedJSObject.Mu.Adapter.prototype.next()`);
    updateState();
  }
  async function prev() {
    await executeScript(`window.wrappedJSObject.Mu.Adapter.prototype.prev()`);
    updateState();
  }

  async function toggleState() {
    const nextState = currentState === 'playing' ? 'pause' : 'resume';
    await executeScript(`window.wrappedJSObject.Mu.Adapter.prototype.${nextState}()`);
    updateState();
  }
</script>

<div class="music">
  <Player
    {currentTrack}
    {currentState}
    on:next={next}
    on:prev={prev}
    on:toggleState={toggleState}
  />
  <VolumeButton {currentVolume} on:toggle={toggleVolume} />
</div>

<style lang="scss">
  .music {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 200px;
    padding: 10px;
  }
</style>
