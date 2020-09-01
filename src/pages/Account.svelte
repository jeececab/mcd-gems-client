<script>
  import { auth } from '../store';

  function deleteAccount() {}
</script>

<style>

</style>

<div class="container">
  <div class="content-container">
    <div class="top">
      <!-- <Avatar /> -->
      <h1>{$auth.user.name}</h1>
    </div>
    <!-- <InfoForm /> -->
    <!-- <ChangePasswordForm /> -->
    <button on:click={deleteAccount} class="btn btn-primary--outline btn-center"> Delete account </button>
  </div>
</div>
