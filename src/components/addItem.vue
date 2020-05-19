<template>
<div>
    
     
<v-btn class="d-flex ml-auto primary waves-effect" small @click="dialog = !dialog"> <v-icon>add</v-icon></v-btn>
<v-row justify="start">
    <v-dialog
        v-model="dialog"
        scrollable 
        max-width="1000px"
        transition="dialog-transition"
    >
    <v-card>
        <v-card-title class="grey--text" >
            Add New Product
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-text-field label="Member Name" v-model="owner.name" required></v-text-field>
                </v-row>
               
               
                <v-card v-for="object in items" :key="object.text" flat class="py-3">              
                    {{object.text}}
                    <v-row class="pa-0 ma-0" v-for="obj in object.data" :key="obj.id">
                     
                        <v-col class="mx-0 px-0" :cols="3" >
                        <v-text-field label="Manufacturer" v-model="obj.manufacturer" autocomplete required></v-text-field>
                        </v-col>
                        <v-col class="d-flex" :cols="4" >
                        <v-text-field label="Description" v-model="obj.desc" required></v-text-field>
                        </v-col>
                        <v-col class="d-flex" :cols="4">
                            <v-text-field label="unique ID"  disabled :value="owner.name+'-'+obj.manufacturer+'-'+obj.desc"   required></v-text-field>
                        </v-col>
                        <v-col :cols="1"  class=" offset-1 ">
                            <a flat color="transparent grey--text " @click="object.data = removeObject(object.data,obj)"><v-icon class="mt-4">close</v-icon> </a>
                        </v-col>
                    </v-row>
                    <v-row justify="center" class="my-3">
                    <v-btn small color="primary justify-center" @click="object.data.push({id:'',manufacturer:'',desc:''})"> <v-icon>add</v-icon></v-btn>
                    </v-row>
                    <v-divider/>
                </v-card>

                <v-row justify="center">
                    <v-btn color="success" :loading="loading" @click="submit()"> <v-icon>store</v-icon> Submit</v-btn>
                </v-row>

            </v-container>  
        </v-card-text>
    </v-card>


    
    </v-dialog>
</v-row>
</div>
</template>

<script>
import db from '@/firebase'
//const db ={}
export default {
    props : {
       
    },
    data: function(){
      
        return {
            dialog:false,
            owner : {name:''},
            loading:false,
            items :{
                camera :{text:'Camera',data:[]},
                lenses :{text:'Lenses',data:[]}, 
                battery :{text:'Battery',data:[]},
                sdcard :{text:'SD Card',data:[]},
                bag :{text:'Bag',data:[]},
                monopod :{text:'Monopod',data:[]},
                tripod :{text:'Tripod',data:[]},
                lenscap:{text:'Lenscap',data:[]},
                backcover:{text:'Backcover',data:[]},
                others:{text:'Others',data:[]},
                
            },
            collectedBy: this.$store.state.username

        }
    },
    methods: {
      
         removeObject(arr,obj)
        {
            return arr.filter((a)=>{
               return a.id!=obj.id
            })
        },
       async submit(){
            console.log(this.items)
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
         await Object.keys(this.items).forEach(prop=>{

                this.loading = true   
                if(this.items[prop].data)
                {
                    this.items[prop] = this.items[prop].data
                    
                    this.items[prop].map(t=>{
                        t.owner = this.owner.name;
                        t.type = prop;
                        t.collectedBy = this.collectedBy;
                        t.id = t.owner+'-'+t.manufacturer+'-'+t.desc
                      db.collection('Item').add(t).then(()=>{error=false}).catch(e=>{error = true; errorMessage = "Unable to add product! Error code : "+e})
                    })

                }

            })
            this.loading = false;
            this.dialog = false;
            if(error)
            alert(errorMessage)
            else
            {
                this.$emit('inventoryUpdated')
                console.log('Database Query Successful')
            }


              this.items ={
                camera :{text:'Camera',data:[]},
                lenses :{text:'Lenses',data:[]}, 
                battery :{text:'Battery',data:[]},
                sdcard :{text:'SD Card',data:[]},
                bag :{text:'Bag',data:[]},
                monopod :{text:'Monopod',data:[]},
                tripod :{text:'Tripod',data:[]},
                lenscap:{text:'Lenscap',data:[]},
                backcover:{text:'Backcover',data:[]},
                others:{text:'Others',data:[]},
                
            }

        },
        
    },
    watch :{
        
      
    }
    
}
</script>