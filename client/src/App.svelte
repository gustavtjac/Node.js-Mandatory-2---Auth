<script>
import { onMount } from 'svelte';
import { Toaster } from "svelte-sonner";
import { Router, Route } from "svelte-routing";
import Home from "./pages/Homepage/Home.svelte";
import Auth from "./pages/Auth/Auth.svelte";
import Landing from "./pages/Landing/Landing.svelte";
import RouteGuard from './components/RouteGuard/RouteGuard.svelte';
import { checkAuth } from './stores/userStore.js';

onMount(() => checkAuth());

</script>
<Toaster/>
<Router>
  <div>
    <Route path='/'><Landing/></Route>
    <Route path='/login'><RouteGuard requireAuth={false}><Auth view="login"/></RouteGuard></Route>
    <Route path='/register'><RouteGuard requireAuth={false}><Auth view="register"/></RouteGuard></Route>
    <Route path='/dashboard'><RouteGuard requireAuth={true}><Home/></RouteGuard></Route>
    <Route><h1>404</h1><p>This page does not exist.</p></Route>
  </div>
</Router>