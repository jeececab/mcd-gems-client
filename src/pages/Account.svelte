<script>
  import Avatar from '../components/Account/Avatar.svelte';
  import InfoForm from '../components/Account/InfoForm.svelte';
  import { auth } from '../store';

  function deleteAccount() {}
</script>

<style>
  .top {
    display: flex;
    margin-top: 2em;
  }

  h1, h2 {
    margin: 0 0 5px 18px;
  }
</style>

<div class="container">
  <div class="content-container">
    <div class="top">
      <Avatar />
      <div>
        <h1>{$auth.user.name}</h1>
        <h2>( {$auth.user.username} )</h2>
      </div>
    </div>
    <InfoForm />
    <!-- <ChangePasswordForm /> -->
    <button on:click={deleteAccount} class="btn btn-primary--outline btn-center"> Delete account </button>
  </div>
</div>
