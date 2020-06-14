<template>
	
	
      
              <div>  

      <q-item clickable v-ripple>

        <q-item-section avatar>
          <q-avatar size="50px">
            <img	src="https://img.icons8.com/color/96/000000/user-male-circle.png"/>
            
          </q-avatar>
        </q-item-section>
        

        <q-item-section>
          <q-item-label lines="1">Produto - <span class="text-red-5"> {{notification.name}} </span> </q-item-label>
          <q-item-label caption lines="2">
              {{notification.message}}
          </q-item-label>

          
        </q-item-section>

        <q-item-section side top>
        <q-btn color="green-6" size="xs" round icon="done_all"  flat/>
   
        <q-btn color="red" size="xs" round icon="delete"  flat/>
        </q-item-section>
        
      </q-item>

      <q-separator inset="item" />
</div> 
     
   
			
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'noticationComponent',
		props: ['notification'],
		data() {
			return {
				saveObject: {}
			};
		},
		computed: {
			toggleDialog: {
				get() {
					return this.dialog;
				},
				set(val) {
					this.$emit('closeDialog');
				}
			}
		},
		mounted() {},
		methods: {
			...mapActions('category', ['editCategory']),

			onReset() {}
		}
	};
</script>

<style scoped></style>
