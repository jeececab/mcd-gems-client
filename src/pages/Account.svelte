<script>
  import Avatar from '../components/Account/Avatar.svelte';
  import { auth } from '../store';

  function deleteAccount() {}
</script>

<style>
  .top {
    display: flex;
    margin-top: 2em;
  }
  
  h1 {
    margin: 0 0 0 0.75em;
  }
</style>

<div class="container">
  <div class="content-container">
    <div class="top">
      <Avatar />
      <h1>{$auth.user.name}</h1>
    </div>
    <!-- <InfoForm /> -->
    <!-- <ChangePasswordForm /> -->
    <button on:click={deleteAccount} class="btn btn-primary--outline btn-center"> Delete account </button>
  </div>
</div>
