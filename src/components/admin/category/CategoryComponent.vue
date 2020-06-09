<template>
	<span>
		<q-card
			clickable
			v-ripple
			class="my-card bg-white"
			flat
			bordered
			square
		>
			<div class="text-left q-pa-sm	">
				<q-chip square size="sm">
					<q-avatar color="red-4" text-color="white">50</q-avatar>
					Productos
				</q-chip>
			</div>
			<q-btn
				flat
				icon="more_horiz"
				class="absolute-top-right "
				text-color="grey-8"
			>
				<q-menu>
					<q-list style="min-width: 100px">
						<q-item clickable v-close-popup>
							<q-item-section
								@click="$emit('updateCategory', category)"
								>Editar</q-item-section
							>
						</q-item>
						<q-item clickable v-close-popup class="text-red">
							<q-item-section
								@click="$emit('removeCategory', idCategory)"
								>Remover
							</q-item-section>
						</q-item>
					</q-list>
				</q-menu>
			</q-btn>
			<q-card-section class="text-center">
				<q-avatar :color="getColor" text-color="white">{{
					category.name | getNames
				}}</q-avatar>
			</q-card-section>

			<div class=" text-body1 text-bold text-center q-pb-lg ">
				{{ category.name }}
			</div>

			<q-tooltip
				content-class="bg-secondary text-white shadow-4 text-caption"
				:offset="[10, 10]"
			>
				{{ category.description || 'Sem  Descrição' }}
			</q-tooltip>
		</q-card>
	</span>
</template>

<script>
	export default {
	   props: ['category', 'idCategory'],
	   data() {
	     return{
	        colors : [
	 "red-5",
	 "deep-orange",
	 "primary",
	 "secondary",
   "pink",
   "teal",
   "light-green",
   "brown",
   "light-green-10",
   "blue-grey"
	   ]
	     }
	    },
	computed: {	     
     getColor(){
          return this.colors[Math.floor(Math.random()*this.colors.length)
          ]
	      }
	    },

		filters: {
			getNames(str) {
				var values = str.split(' ');
				var f_name = values.shift();
        var l_name = values.join(' ');
        
        let lastName = f_name+l_name
      	var values_ = lastName.split(' ');
		    var f_name_ = values_.shift();
        var l_name_ = values_.join(' ');


				return f_name.charAt(0).toUpperCase() + l_name.charAt(0).toUpperCase()  + l_name_.charAt(0).toUpperCase() ;
			}
		}
	};
</script>

<style>
	#btn :hover {
		transition: 0.5s;
		background: #4d91d0;
		color: white;
	}
</style>
