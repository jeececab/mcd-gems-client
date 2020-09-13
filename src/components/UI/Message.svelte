<script>
  import { message } from '../../store';

  function hideMessage() {
    message.set({ content: '', show: false });
  }
</script>

<style>
  div {
    background: var(--darkblue);
    padding: 0.5em;
    position: fixed;
    bottom: -60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: bottom ease-in-out 0.125s;
  }
  div.display {
    bottom: 0px;
  }

  p {
    font-size: 1.125rem;
    font-weight: bold;
    line-height: 1.3;
  }
</style>

<div on:click={hideMessage} class={$message.show ? 'display' : ''}>
  <p>{$message.content}</p>
</div>
