<template>
<div  >
    
     
<v-btn class="d-flex ml-auto primary waves-effect" small @click="dialog = !dialog"> <v-icon>add</v-icon> New Allotment</v-btn>
<v-container v-if="dialog" >

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
            <v-form ref="form" @submit.prevent="submit()" v-model="formValid">
                
            
           <v-row class="d-flex">
            <v-text-field width="50"  :rules="[() => newAllotment.allotedTo.length > 0 || 'Required field']" required v-model="newAllotment.allotedTo" label="Name" class="mx-5" multiple small-chips/>
            <v-text-field label="Event"  :rules="[() => newAllotment.event.length > 0 || 'Required field']" required v-model="newAllotment.event" class="mx-5" small-chips/>
           </v-row>

            <v-row >
            <v-select label="Camera" autocomplete="off"  v-model="newAllotment.camera" :items="items['camera']" class="mx-5" multiple small-chips/>
            <v-select label="Lenses"  v-model="newAllotment.lenses" :items="items['lenses']" class="mx-5" multiple small-chips/>  
           </v-row>
           <v-row>
               <v-select label="Battery"  v-model="newAllotment.battery" :items="items['battery']" class="mx-5" multiple small-chips/>
               <v-select label="SD Card"  v-model="newAllotment.sdcard" :items="items['sdcard']" class="mx-5" multiple small-chips/>
               <v-select label="Bag"  v-model="newAllotment.bag" class="mx-5" :items="items['bag']" multiple small-chips/>
           </v-row>
            <v-row>
               <v-select label="Monopod"  v-model="newAllotment.monopod" :items="items['monopod']" class="mx-5" multiple small-chips/>
               <v-select label="Tripod"  v-model="newAllotment.tripod" :items="items['tripod']" class="mx-5" multiple small-chips/>
            </v-row>
             <v-row>
               <v-select label="lenscap"  v-model="newAllotment.lenscap" :items="items['lenscap']" class="mx-5" multiple small-chips/>
               <v-select label="back cover"  v-model="newAllotment.backcover" :items="items['back cover']" class="mx-5" multiple small-chips/>
               <v-text-field label="Others"  v-model="newAllotment.others"  class="mx-5" multiple small-chips/>
            </v-row>
            <v-row justify="center">
            <v-btn color="primary" :disabled="!formValid" type="submit"> <v-icon>create</v-icon> Allot</v-btn>
            </v-row>
            </v-form>
        </v-card-text>
    </v-card>


    
    </v-dialog>
    
</v-container>
</div>
</template>

<script>
import db from '@/firebase'

export default {
    props : {
       
    },
    data: function(){
      
        return {
            dialog:false,
            formValid:true,
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
                lenscap:[],
                backcover:[],
                others:[],
                datetime:""
            },
            items:{}

        }
    },
    created(){
         db.collection('currentAllotment').onSnapshot(() => {
           this.setItems()         
        })
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
                    var t = this.newAllotment
                    var arr = [...t.camera,...t.lenses,...t.battery,...t.sdcard,...t.bag,...t.monopod,...t.tripod,...t.lenscap,...t.backcover,...t.others]
                    await arr.forEach(async a=>{
                     await db.collection('currentAllotment').doc(a).set({}).then(()=>{this.error=false}).catch(e=>{this.error = true; this.errorMessage = "Unable to add product! Error code : "+e})
                    })
                    
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
                var ref= this;
                const snapshot = await db.collection('Item').get()
                this.items = {}
               await snapshot.docs.forEach(async doc => {
                    doc = doc.data()
                    
                   
                    var name = doc.id;
                    if(name)
                    {
                    name= name.toString()
                    
                   
                    var flag=true;
                    await db.collection("currentAllotment").doc(name).get().then(d=>{
                        if(d.exists)
                        flag = false
                    });
                   
                     if(!ref.items[doc.type])
                    ref.items[doc.type] = []
                    if(flag)
                    ref.items[doc.type].push(name)
                    }      
                })
                // console.log("items : "+JSON.stringify(this.items))
            },
            
        
    },
    watch :{
        
      
    }
    
}
</script>