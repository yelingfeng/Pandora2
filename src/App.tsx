import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <p> 
          <center>
            <router-link to="/">Go to Home</router-link> |
            <router-link to="/element">Go to element</router-link>
          </center> 
        </p>
        <RouterView />
      </>
    )
  }
})