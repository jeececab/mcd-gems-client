<script>
  import { onMount } from 'svelte';
  import { navigate, Route } from 'svelte-routing';
  import { currentPage } from '../../store';

  export let to = '';

  onMount(() => {
    currentPage.set(to);
    navigate(to, { replace: true });
  });
</script>
