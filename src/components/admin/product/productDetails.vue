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
                  {{product.code}}
                    </q-card-section>
                  
                 </q-card>
               
              </div>  

            <div class ='col q-pa-xs'>
                    <q-card flat bordered class="my-card">
                    
                    <q-card-section class="q-pt-none text-center">
                   <div class="text-body1 q-pa-md text-green ">Stock no Armazém</div>
                      <q-separator inset />
                     {{product.quantity}} Unidades
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
                   <div class="text-body1 q-pa-md text-green">Preço a (Retalho)</div>
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
                      {{product.expiresn || 'Nunca expira'}} 
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
                   <div class="text-body1 q-pa-md  text-green">Preco a (Grosso)</div>
                      <q-separator inset />
                     {{product.grosso || 'Nao definido'}} 
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
                   <div class="text-body1 q-pa-md text-cyan-5">Categoria</div>
                      <q-separator inset />
                      {{product.category.label }} 
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