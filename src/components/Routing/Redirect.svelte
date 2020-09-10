<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { currentPage } from '../../store';

  export let to = '';

  onMount(() => {
    setTimeout(() => {
      currentPage.set(to);
      navigate(to, { replace: true });
    }, 50)
  });
</script>
