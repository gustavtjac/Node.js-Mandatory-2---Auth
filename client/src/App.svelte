<script>
import { onMount } from 'svelte';
import { Toaster } from "svelte-sonner";
import { Router, Link, Route, navigate } from "svelte-routing";
import Home from "./pages/Homepage/Home.svelte";
import Auth from "./pages/Auth/Auth.svelte";
import Landing from "./pages/Landing/Landing.svelte";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.svelte';

</script>
<Toaster/>
<Router>
  <div>
    <Route path='/'>
      <Landing/>
    </Route>
    <Route path='/auth'>
      <Auth/>
    </Route>
    <Route path='/dashboard'>
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    </Route>
  </div>
</Router>