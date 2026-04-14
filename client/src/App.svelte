<script>
import { Router, Link, Route } from "svelte-routing";
import Home from "./pages/Homepage/Home.svelte";
import Auth from "./pages/Auth/Auth.svelte";
import Landing from "./pages/Landing/Landing.svelte";


</script>

<Router>
  <div>
    <Route path='/'><Landing/></Route>
    <Route path='/auth'><Auth/></Route>
    <Route path='/dashboard'><Home/></Route>
  </div>
</Router>