<template>
  <!-- banner -->
  <div class="banner mt-5 pt-4 mb-5">
    <div class="container">
      <div class="row">
        <div class="col">
          <div
            id="carouselExampleCaptions"
            class="carousel slide"
            data-bs-ride="false"
          >
            <div v-if="sliders.length > 0">
              <div class="carousel-inner">
                <div
                  class="carousel-item"
                  v-for="(slider, id) in sliders"
                  :class="{ active: id == 0 }"
                  :key="slider.id"
                >
                  <img
                    :src="slider.image"
                    class="d-block w-100 img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div v-else class="mt-1">
              <div
                class="card border-0 shadow-sm rounded-lg mb-3"
                v-for="loader in sliders_loader"
                :key="loader"
              >
                <div class="card-body pt-4">
                  <ContentLoader />
                </div>
              </div>
            </div>

            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- banner -->
</template>

<script>
//import content loader
import { ContentLoader } from "vue-content-loader";
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "SliderComponent",
  components: {
    //loader component
    ContentLoader,
  },
  setup() {
    const sliders = ref([]);
    //define state
    const sliders_loader = ref(1);

    onMounted(() => {
      axios
        .get("/slider")
        .then((response) => {
          sliders.value = response.data.data.data;
        })
        .catch(() => {
          sliders.value = [];
        });
    });

    return {
      sliders,
      sliders_loader,
    };
  },
};
</script>
