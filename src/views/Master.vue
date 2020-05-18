<template>
    <div>
          <v-snackbar
          :timeout="2000"
          top color="primary"
          v-model="snackbar"
        >
          <span class="ma-auto"> Masters updated!</span>
           
        </v-snackbar>
        <v-container  class="d-flex">
        <h2 class="subheading grey--text"> Masters </h2>
            <v-spacer></v-spacer>
            <AddItem class="mx-1" @inventoryUpdated="snackbar=true" />
            <v-btn color="success mx-2" disabled @click="exportFile()" small > <v-icon>cloud_download</v-icon> </v-btn>
         
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
import db from '@/firebase'
import XLSX from 'xlsx'
import AddItem from '@/components/addItem'
export default {
    components: {
      AddItem  
    },
    data : function(){
        return {
            snackbar:false,
            search:'',
            headers:[{text:'Name',value:'name'},{text:'Camera',value:'camera'},{text:'Lenses',value:`lenses`},{text:'Battery',value:'battery'},{text:'Bag',value:'bag'},{text:'Charger',value:'charger'},{text:'SDCard',value:'sdcard'},{text:'Tripod',value:'tripod'},{text:'Monopod',value:'monopod'},{text:'Lenscap',value:'lenscap'},{text:'BackCover',value:'backcover'},{text:'Others',value:'others'}],
            inventory : []
        }
    },
    created () 
    {
        this.getInventory()
         
       
        db.collection('Item').onSnapshot(res => {
            const changes = res.docChanges()

            changes.forEach(change=>{
                 if(change.type==='added')
                 this.inventory.push({
                     ...change.doc.data()
                     
                 })
                 else
                    this.getInventory()
            })
        })
    },
    mounted :function() {
      
    },
    methods:{
        async getInventory()
        {

        const snapshot = await db.collection('Item').get()
          this.inventory = snapshot.docs.map(doc => doc.data());
         
          
        },
         exportFile() {
            
            var aoo = this.filteredInventory
                //converting aoo to aoa

            var aoa=[["Owner","Camera","Lenses","Battery","SD Card","Bag","Monopod","Tripod"]]
                aoo.forEach(t=>{
                    let arr = [t.owner,t.camera,t.lenses,t.battery,t.sdcard,t.bag,t.monopod,t.tripod]
                    aoa.push(arr)
                })

            const wb = XLSX.utils.book_new()
            const wsAll = XLSX.utils.aoa_to_sheet()
                XLSX.utils.book_append_sheet(wb, wsAll, "Inventory Data")
                XLSX.writeFile(wb, "DoPy Inventory.xlsx")
        }
    },

    computed :{
    filteredInventory(){
            //inventory format
        // var inventory =[{type:'camera', owner : 'Ritik',manufacturer :'Canon',desc:'700d' },
        //             {type:'camera', owner : 'Ritik',manufacturer :'Nikon',desc:'d5600' },
        //             {type:'lenses', owner : 'Ritik',manufacturer :'Canon',desc:'18-55mm' },
        //             {type:'camera', owner : 'Taneja',manufacturer :'Canon',desc:'700d' },
        //             {type:'camera', owner : 'Taneja',manufacturer :'Nikon',desc:'d5600' },
        //             {type:'lenses', owner : 'Taneja',manufacturer :'Canon',desc:'18-55mm' }]
        
        // var updatedInventory = [{name:'dd',camera:['','']}]
        var updatedInventory={}

        this.inventory.forEach(i=>{
            if(!updatedInventory[i.owner])
                updatedInventory[i.owner]=[]
            if(!updatedInventory[i.owner][i.type])
                updatedInventory[i.owner][i.type] = []

           updatedInventory[i.owner][i.type].push(i.manufacturer + i.desc)

        })

        //updatedInventory Format = {user1 :[camera :[string,string],lenses :[string,] ]}
       // console.log(updatedInventory)

        var finalArray =[]

        Object.keys(updatedInventory).forEach(userWise=>{
          
           
          
             var obj = {name:userWise,...updatedInventory[userWise]};

          
            finalArray.push(obj)

        })
        //finalArray format = [{owner:user1,camera:[string,string],lenses:[string,string]},{owner:user2,camera:[],...}]
       
        return finalArray

    }
    }
    
}
</script>