<template>
    <div>
        <v-container  class="d-flex">
        <h2 class="subheading grey--text"> Master </h2>
         <AddProduct class="ml-auto"/>
       </v-container>

        <v-container class="px-0 d-flex">
           
            <v-card>
                <v-card-title>
                Inventory DB
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
               
                <v-data-table 
                dense
                :search="search" 
                :items="filteredInventory" 
                :headers="headers"
                >
                </v-data-table>    
            </v-card>
        </v-container>

       
        
    </div>
</template>

<script>
import AddProduct from '@/components/addProduct'
export default {
    components: {
      AddProduct  
    },
    data : function(){
        return {
            search:'',
            headers:[{text:'Name',value:'name'},{text:'Camera',value:'camera'},{text:'Lenses',value:`lenses`},{text:'Battery',value:'battery'},{text:'Bag',value:'bag'},{text:'Charger',value:'charger'},{text:'SDCard',value:'sdcard'},{text:'Tripod',value:'tripod'},{text:'Monopod',value:'monopod'},{text:'Others',value:'others'},{text:'CollectedBy',value:'collectedBy'}],
            inventory : this.$store.state.inventory
        }
    },
    computed :{
    filteredInventory(){
        var i = this.inventory.map(perUser => {

            //Extracting each entry object from main array
            Object.keys(perUser).forEach(prop =>{
                //Modifying each attribute of object
                if(perUser[prop].data)
                   { 
                    //converting object to array
                    perUser[prop] = perUser[prop].data
                    //converting array of objects to array of strings
                     perUser[prop] = perUser[prop].map(t=> {
                        
                        return t.desc+" "+t.manufacturer
                    })
                  } 
            })
             perUser.name = perUser['owner'].name;
           
             return perUser;

           
        })

        

         return i;

    }
    }
    
}
</script>