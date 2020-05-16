<template>
    <nav >
      <v-app-bar app class="grey lighten-4" flat >
          <v-app-bar-nav-icon class="grey--text" @click="drawer=!drawer"></v-app-bar-nav-icon>
         <v-toolbar-title class="text-uppercase grey--text">
             <span class="font-weight-light">Inventory</span><span >Manager</span>
         </v-toolbar-title>
         <v-spacer></v-spacer>
            <v-btn  color="grey--text"  >
                <span>Sign Out </span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>

      </v-app-bar>
    
        <v-navigation-drawer app v-model="drawer" class="blue darken-2 pt-5">
          <v-list v-for="link in links" :key="link.text"  class="ma-0 pa-0 ">
             
              <v-list-item router :to="link.route">
                  <v-list-item-action>
                      <v-icon class="white--text">{{link.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title class=" white--text">{{link.text}}</v-list-item-title>
                  </v-list-item-content>

           </v-list-item>
              
          </v-list>

        </v-navigation-drawer>

    </nav>
</template>

<script>
export default {
    
    data : function(){
        return {
            drawer:false,
            links : [
                {icon:'dashboard',text:'Dashboard', route:'/'},
                {icon:'add_to_queue',text:'Allotments', route:'/allot'},
                {icon:'folder_open',text:'Masters', route:'/master'},
               
               // {icon:'dashboard',text:'Dashboard', route:'/d'},

            ]
        }
    }
}
</script>

<style lang="scss">
    
</style>