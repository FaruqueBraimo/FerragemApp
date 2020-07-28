<template>
  <div> 
    <q-card class="my-card" square >
   
      <q-card-section class='text-grey-8'>
        <div class="text-h6 text-bold text-primary q-pb-md text-center">{{product.name}}</div>

          <div class = 'row'>
             <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-center">
                   <div class="text-body1 q-pa-md text-pink-5 ">Codigo</div>
                      <q-separator inset />
                     KM-- {{product.code}}
                    </q-card-section>
                  
                 </q-card>
               
              </div>  

            <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-center">
                   <div class="text-body1 q-pa-md text-green ">Stock Actual</div>
                      <q-separator inset />
                     {{product.qtdWarehouse}} Unidades
                    </q-card-section>
                  
                 </q-card>
               
              </div>  

                <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-center">
                   <div class="text-body1 q-pa-md  text-green ">Preço de venda</div>
                      <q-separator inset />
                    	<q-chip square size="sm" color="teal" class="text-white">
				{{ product.price_buy ? product.price_buy : 0 }} ,00 MZN
			</q-chip>
                    </q-card-section>
                  
                 </q-card>
               
              </div>  
               <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none  text-center">
                   <div class="text-body1 q-pa-md text-green">Preço de Compra</div>
                      <q-separator inset />
                      {{product.price_payd}} ,00 MT
                    </q-card-section>
                  
                 </q-card>
               
              </div>  
               <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none  text-center">
                   <div class="text-body1 q-pa-md text-green">Expira em</div>
                      <q-separator inset />
                      {{product.expires}} 
                    </q-card-section>
                  
                 </q-card>
               
              </div>  
            
            </div> 
            
              <div class = 'row'>
             <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-center">
                   <div class="text-body1 q-pa-md text-green">Fornecedor</div>
                      <q-separator inset />
                      {{product.provider.label}}
                    </q-card-section>
                  
                 </q-card>
               
              </div>  

            <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-center">
                   <div class="text-body1 q-pa-md  text-green">Iva</div>
                      <q-separator inset />
                     {{product.iva}} ,00 MT
                    </q-card-section>
                  
                 </q-card>
               
              </div>  

                <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-center">
                   <div class="text-body1 q-pa-md text-green">Desconto de Iva</div>
                      <q-separator inset />
                      {{product.discount_iva}} ,00 MT
                    </q-card-section>
                  
                 </q-card>
               
              </div>  
               <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-grey-7 text-center">
                   <div class="text-body1 q-pa-md text-green">No balcão</div>
                      <q-separator inset />
                      {{product.qtdBalcony}} unidades
                    </q-card-section>
                  
                 </q-card>
               
              </div>  
               <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none  text-center">
                   <div class="text-body1 q-pa-md text-green">Roptura de Stock</div>
                      <q-separator inset />
                      {{product.stockBreak}} 
                    </q-card-section>
                  
                 </q-card>
               
              </div>  

              
              
              
            
            
            </div> 

              <div class = 'row'>
             <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-center">
                   <div class="text-body1 q-pa-md text-pink-5">Referência</div>
                      <q-separator inset />
                      {{product.reference }} 
                    </q-card-section>
                  
                 </q-card>
               
              </div>      

              <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-center">
                   <div class="text-body1 q-pa-md text-green">Lucro</div>
                      <q-separator inset />
                      {{product.profit}} 
                    </q-card-section>
                  
                 </q-card>
               
              </div>   
              
                             
               <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none  text-center">
                   <div class="text-body1 q-pa-md text-green"> Margem de Lucro</div>
                      <q-separator inset />
                      {{product.profitMargin}} 
                    </q-card-section>
                  
                 </q-card>
               
              </div>  

              
              
              
            
            
            </div> 
         

         
      </q-card-section>
        

      
      <q-card-section class = ' ' >
          
          <div class= 'row'>
            
            <div class ='col  q-pl-md text-center text-caption text-italic'> 
               {{product.description}}
              </div>


            <div class ='col q-pr-xl text-center text-primary '>
                                    <q-separator vertical  />

              {{product.category.label}}
               </div>
              
               
             </div>
          
        
      </q-card-section>

    </q-card>

 </div>
</template>

<script>

export default {
    props : ['product']

}
</script>

<style>

</style>