<template>
  <v-container>
     <v-snackbar
          :timeout="500"
          top color="primary"
          v-model="snackbar"
        >
          <span class="ma-auto"> Allotment Done!</span>
           
        </v-snackbar>
    <div class="d-flex">
        <h2 class=" grey--text"> Allotments </h2>
        <v-spacer></v-spacer>
        <AllotItem v-if="!snackbar" class="mx-1" @allotmentSuccessful="snackbar=true" />
        
    </div>
       
    <AllotmentTable/>
    <div class="mt-5 d-flex">
      <v-spacer></v-spacer>
    <v-btn small color="warning "> <v-icon class="pr-1 ml-0 pl-0">restore</v-icon> Traceback</v-btn>
    </div>

  </v-container>

</template>
<script>
import AllotmentTable from '../components/allotmentTable'
import AllotItem from '../components/allotItem'
export default {
    components :{
        AllotmentTable,
        AllotItem
    },
    data : function(){
      return {
        snackbar:false
      }
    }
    
    
}
</script>