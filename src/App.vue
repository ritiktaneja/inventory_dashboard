<template>
  <v-app>
  
        <Navbar/>
  
    <v-content class="grey lighten-4">
     <v-container class="pl-5">
      <router-view/>
      </v-container>
    </v-content>
    
   
  </v-app>

</template>

<script>

import Navbar from '@/components/navigation.vue'

export default {
  name: 'App',


  components: {
    Navbar
  },

  data: () => ({
    items : []
  }),
};
</script>
