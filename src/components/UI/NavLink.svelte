<script>
  import { link } from 'svelte-routing';
  import { createEventDispatcher } from 'svelte';
  import { currentPage } from '../../store';

  const dispatch = createEventDispatcher();

  export let to = '';
  export let customClass = '';

  let className = customClass ? customClass : 'link';

  function handleClick() {
    currentPage.set(to);
    dispatch('clickedLink');
  }
</script>

<style>
  .link {
    color: var(--white);
    font-size: 1.25rem;
    font-weight: bold;
    text-decoration: none;
  }

  .link:hover::after {
    color: var(--red);
    content: ' — ';
    position: relative;
    left: 8px;
  }

  .link.active {
    color: var(--red);
  }

  .link.active::after {
    content: ' — ';
    position: relative;
    left: 8px;
  }
</style>

<a on:click={handleClick} use:link class="{className} {$currentPage === to ? 'active' : ''}" href={to}>
  <slot />
</a>
