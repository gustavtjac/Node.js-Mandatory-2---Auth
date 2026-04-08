<script>

let mode = $state('login');

</script>


<section>

    <div>
     
        <h2>{mode === 'login' ? 'Login' : 'Sign up'}</h2>
    </div>

    <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email">
    </div>
     <div>
        <label for="password">password</label>
        <input type="password" name="password" id="password">

        {#if mode === 'signup'}
      <div>
          <label for="confirm">Confirm password</label>
          <input type="password" name="confirm" id="confirm">
      </div>
    {/if}

    </div>
    <div>
        <button type="submit">{mode === 'login' ? 'Login' : 'Sign up'}</button>
    
    </div>
<button onclick={() => mode = mode === 'login' ? 'signup' : 'login'}>
      Switch to {mode === 'login' ? 'Sign up' : 'Login'}
  </button>
</section>