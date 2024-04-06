<template>
  <div id="category">
    <Header />
    <!-- Berita -->
    <div class="berita" id="halaman_berita">
      <div class="container">
        <div class="row pt-2 g-2 mb-2">
          <div class="col-md-12">
            <h2 class="border-bottom fw-bold">
              {{ categoryInfo.message }}
            </h2>
          </div>
        </div>
        <div v-if="posts.length > 0" class="row g-4 pt-2">
          <div class="col-md-4" v-for="post in posts" :key="post.id">
            <div class="card">
              <img :src="post.image" class="p-2 card-img-top" alt="..." />
              <div class="card-body">
                <router-link
                  :to="{
                    name: 'detail_post',
                    params: { slug: post.slug },
                  }"
                  class="text-dark text-decoration-none"
                >
                  <p class="card-title">{{ post.title }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="alert alert-danger text-center">
            DATA BERITA BELUM TERSEDIA !
          </div>
        </div>
        <div class="text-center m-5" v-show="moreExists">
          <button
            type="button"
            class="btn btn-primary btn-md"
            v-on:click="loadMore"
          >
            <span class="fa fa-arrow-down"></span> LIHAT LEBIH BANYAK
          </button>
        </div>
      </div>
    </div>
    <!-- berita -->
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "CategoryComponent",
  components: {
    Header,
    Footer,
  },
  setup() {
    const posts = ref([]);
    const categoryInfo = ref({});
    let moreExists = ref(false);
    let nextPage = ref(0);
    const route = useRoute();

    const fetchDataPost = () => {
      axios.get(`/category/${route.params.slug}`).then((response) => {
        categoryInfo.value = response.data.response;

        posts.value = response.data.data.data;
        console.log(response.data.data.data);
        //check if response has next page
        if (response.data.data.current_page < response.data.data.last_page) {
          //set state moreExists to true
          moreExists.value = true;

          //increment nextPage
          nextPage.value = response.data.data.current_page + 1;
        } else {
          //set state moreExists to false
          moreExists.value = false;
        }
      });
    };

    const loadMore = () => {
      axios
        .get(`/category/${route.params.slug}?page=${nextPage.value}`)
        .then((response) => {
          if (response.data.data.current_page < response.data.data.last_page) {
            //set state moreExists to true
            moreExists.value = true;

            //increment nextPage
            nextPage.value = response.data.data.current_page + 1;
          } else {
            //set state moreExists to false
            moreExists.value = false;
          }
          // //assign response to state posts
          response.data.data.data.forEach((data) => {
            posts.value.push(data);
          });
        });
    };

    onMounted(() => {
      fetchDataPost();
    });

    return {
      posts,
      categoryInfo,
      moreExists,
      nextPage,
      loadMore,
    };
  },
};
</script>
