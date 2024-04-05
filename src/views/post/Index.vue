<template>
  <div id="post">
    <!-- header -->
    <Header />
    <!-- end header -->

    <!-- Berita -->
    <div class="berita" id="halaman_berita">
      <div class="container">
        <div class="row pt-2 g-2 mb-2">
          <div class="col-md-12">
            <h2 class="border-bottom fw-bold">Berita Terbaru</h2>
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
    <!-- end header -->
  </div>
</template>

<script>
//import content loader
import { FacebookLoader } from "vue-content-loader";

//import axios
import axios from "axios";

//import hook onMounted from vue
import { ref, onMounted } from "vue";

//import component
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";

export default {
  name: "PostCmponent",

  components: {
    //loader component
    FacebookLoader,
    // component app
    Header,
    Footer,
  },

  setup() {
    //define state
    const posts = ref([]);
    const posts_loader = ref(6);

    //define state moreExists
    let moreExists = ref(false);
    let nextPage = ref(0);

    //define method
    const fetchDataPosts = () => {
      axios.get("http://rizaags.my.id:89/api/post").then((response) => {
        //assign response to state posts
        posts.value = response.data.data.data;

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

    //define method loadMore
    const loadMore = () => {
      axios
        .get(`http://rizaags.my.id:89/api/post?page=${nextPage.value}`)
        .then((response) => {
          console.log(response.data.data);
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

          // //assign response to state posts
          response.data.data.data.forEach((data) => {
            posts.value.push(data);
          });
        });
    };

    //run hook onMounted
    onMounted(() => {
      //fetch data posts
      fetchDataPosts();
    });

    //return data
    return {
      posts,
      posts_loader,
      moreExists,
      nextPage,
      loadMore,
    };
  },
};
</script>
