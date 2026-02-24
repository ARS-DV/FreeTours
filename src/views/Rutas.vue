<script setup>
import { ref } from "vue";
import router from "@/router";
import { rutaApi } from "@/main";
import CiudadView from "./CiudadView.vue";
const arrayRutas = ref([]);
async function listarRutas() {
  fetch(rutaApi + "rutas", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
        let recuento = {};
        for(let i = 0; i < data.length; i++){
            let ciudad = data[i].localidad;

                if(!recuento[ciudad]){
                    recuento[ciudad] = 0
                }
                recuento[ciudad]++
        }
     arrayRutas.value=recuento
    })
    .catch((error) => console.error("Error:", error));
}

function irACiudad(nombreCiudad) {
  //
  router.push('/ciudadview/'+nombreCiudad);
}
listarRutas()
</script>


   <template>
  <div class="container my-5 d-flex justify-content-center">
    
    <div style="max-width: 1000px; width: 100%;">
      <table class="table table-bordered text-center">
          
          <template v-for="(total, ciudad) in arrayRutas" :key="ciudad">
            
            <thead class="cabecera-ciudad" @click="irACiudad(ciudad)">
              <tr>
                <th scope="col" class="fs-5 fw-bold text-uppercase py-3">
                  {{ ciudad }}
                </th>
              </tr>
            </thead>
            
            <tbody class="cuerpo-total">
              <tr>
                <td class="fs-1 fw-bolder py-4">
                  {{ total }}
                </td>
              </tr>
            </tbody>

          </template>

      </table>
    </div>

  </div>
</template>

<style scoped>
.cabecera-ciudad th {
  background-color: #00A8B5 ;
  color: #ffffff ;
  cursor: pointer;
}

.cabecera-ciudad:hover th {
  background-color: #FF8C42 ; 
}


</style>
