<template>
<div>
    
     
<v-btn class="d-flex ml-auto primary waves-effect" small @click="dialog = !dialog"> <v-icon>add</v-icon> New Allotment</v-btn>
<v-row justify="start">
    <v-dialog
        v-model="dialog"
        scrollable 
        max-width="1000px"
        transition="dialog-transition"
    >
    <v-card>
        <v-card-title class="grey--text" >
           New Allotment
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
           <v-row class="d-flex">
            <v-combobox width="50" :rules="['required']" required v-model="newAllotment.allotedTo" label="Name" class="mx-5" multiple small-chips/>
            <v-combobox label="Event"  :rules="['required']" v-model="newAllotment.event" class="mx-5" small-chips/>
           </v-row>

            <v-row >
            <v-combobox label="Camera" autocomplete="off"  v-model="newAllotment.camera" :items="getNameArray('camera')" class="mx-5" multiple small-chips/>
            <v-combobox label="Lenses"  v-model="newAllotment.lenses" :items="getNameArray('lenses')" class="mx-5" multiple small-chips/>  
           </v-row>
           <v-row>
               <v-combobox label="Battery"  v-model="newAllotment.battery" :items="getNameArray('battery')" class="mx-5" multiple small-chips/>
               <v-combobox label="SD Card"  v-model="newAllotment.sdcard" :items="getNameArray('sdcard')" class="mx-5" multiple small-chips/>
               <v-combobox label="Bag"  v-model="newAllotment.bag" class="mx-5" :items="getNameArray('bag')" multiple small-chips/>
           </v-row>
            <v-row>
               <v-combobox label="Monopod"  v-model="newAllotment.monopod" :items="getNameArray('monopod')" class="mx-5" multiple small-chips/>
               <v-combobox label="Tripod"  v-model="newAllotment.tripod" :items="getNameArray('tripod')" class="mx-5" multiple small-chips/>
            </v-row>
            <v-row justify="center">
            <v-btn color="primary" type="submit" @click="submit()"> <v-icon>create</v-icon> Allot</v-btn>
            </v-row>
        </v-card-text>
    </v-card>


    
    </v-dialog>
</v-row>
</div>
</template>

<script>
import db from '@/firebase'

export default {
    props : {
       
    },
    data: function(){
      
        return {
            dialog:true,
            owner : {name:''},
            loading:false,
            newAllotment:{
                allotedTo:"",
                event:"",
                camera:[],
                lenses:[],
                battery:[],
                sdcard:[],
                bag:[],
                tripod:[],
                monopod:[],
                datetime:""
            },
            items:{}

        }
    },
    mounted : function() {
        this.setItems()
    },
    methods: {
         removeObject(arr,obj)
        {
            return arr.filter((a)=>{
               return a.id!=obj.id
            })
        },
       async submit(){
           
            // this.$store.commit('addToInventory',this.items)
            // this.items ={
            //     owner : {name:""},
            //     camera :{text:'Camera',data:[]},
            //     lenses :{text:'Lenses',data:[]}, 
            //     battery :{text:'Battery',data:[]},
            //     sdcard :{text:'SD Card',data:[]},
            //     bag :{text:'Bag',data:[]},
            //     monopod :{text:'Monopod',data:[]},
            //     tripod :{text:'Tripod',data:[]},
            // }

            //const item = {};
            var error= false; let errorMessage=""
         
                    this.newAllotment.datetime=Date.now()    
                    await db.collection('Allotment').add(this.newAllotment).then(()=>{error=false}).catch(e=>{error = true; errorMessage = "Unable to add product! Error code : "+e})
                    

         
            this.loading = false;
            this.dialog = false;
            if(error)
            alert(errorMessage)
            else
            {
                this.$emit('allotmentSuccessful')
                console.log('Database Query Successful')
            }




        },
        async setItems()
            {
                const snapshot = await db.collection('Item').get()
                this.items = {}
                snapshot.docs.forEach(doc => {
                    doc = doc.data()
                    var name = doc.owner + " " + doc.desc;
                    if(!this.items[doc.type])
                    this.items[doc.type] = []
                    
                  //  console.log('doc = '+doc, "this.items : "+this.items)
                    this.items[doc.type].push({name:name,id:doc.id})
                   // console.log('doc = '+doc, "this.items : "+this.items)
                    
                })
                // console.log("items : "+JSON.stringify(this.items))
            },
            getNameArray(s)
            {
                var arr=[]
                if(this.items[s])
                arr = this.items[s].map(s=>s.name)

                return arr;
            }
        
    },
    watch :{
        
      
    }
    
}
</script>