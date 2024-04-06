<template>
  <div id="home">
    <!-- header -->
    <Header />
    <!-- end header -->

    <!-- slider -->
    <Slider />
    <!-- end slider -->

    <!-- Berita -->
    <div class="berita mt-5 mb-5">
      <div class="container">
        <div class="row pt-2 g-2">
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-12">
                <h2 class="blue-bottom-border fw-bold text-blue">
                  BERITA SEKOLAH
                </h2>
              </div>
            </div>

            <div v-if="posts.length > 0" class="row g-4 pt-2">
              <div class="col-md-4" v-for="post in posts" :key="post.id">
                <div class="card">
                  <img :src="post.image" class="p-1 card-img-top" alt="..." />
                  <div class="card-body p-2">
                    <router-link
                      :to="{
                        name: 'detail_post',
                        params: { slug: post.slug },
                      }"
                      class="text-dark text-decoration-none"
                    >
                      <p class="card-title fw-semibold">{{ post.title }}</p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="row">
                <div class="col-md-">
                  <div class="card">
                    <div class="card-body">
                      <BulletListLoader />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pengumuman -->
          <div class="col-md-3">
            <div class="row">
              <div class="col-md-12" id="pengumuman">
                <h2 class="blue-bottom-border fw-bold text-blue">PENGUMUMAN</h2>
              </div>
            </div>
            <div class="row pt-2">
              <div class="col-md-12">
                <ul class="list-group">
                  <div v-if="events.length > 0">
                    <router-link
                      :to="{
                        name: 'detail_event',
                        params: { slug: event.slug },
                      }"
                      v-for="event in events"
                      :key="event.id"
                      class="text-decoration-none"
                    >
                      <li class="list-group-item">
                        <i class="bi bi-bell-fill blue-icon"></i>
                        {{ event.title }}
                      </li>
                    </router-link>
                  </div>

                  <div v-else>
                    <FacebookLoader />
                  </div>
                </ul>
              </div>
            </div>

            <div class="row mt-5" id="kategori">
              <div class="col-md-12">
                <h2 class="blue-bottom-border fw-bold text-blue">KATEGORI</h2>
              </div>
            </div>
            <div class="row pt-2">
              <div class="col-md-12">
                <ul class="list-group">
                  <div v-if="categories.length > 0">
                    <router-link
                      :to="{
                        name: 'detail_category',
                        params: { slug: category.slug },
                      }"
                      v-for="category in categories"
                      :key="category.id"
                      class="text-decoration-none"
                    >
                      <li class="list-group-item">
                        <i class="bi bi-book-fill blue-icon"></i>
                        {{ category.name }}
                      </li>
                    </router-link>
                  </div>

                  <div v-else>
                    <ContentLoader />
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <!-- Pengumuman -->
        </div>
      </div>
    </div>
    <!-- berita -->

    <!-- Foto -->
    <!-- Foto -->
    <div class="foto mt-5 mb-5" id="foto">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="blue-bottom-border fw-bold text-blue">FOTO KEGIATAN</h2>
          </div>
        </div>

        <div v-if="photos.length > 0" class="row pt-2">
          <div class="col-md-4" v-for="photo in photos" :key="photo.id">
            <img
              :src="photo.image"
              class="w-100 mb-1 img-fluid"
              alt="{{ photo.caption }}"
            />
            <p class="fw-semibold">
              {{ photo.caption }}
            </p>
          </div>
        </div>

        <div v-else>
          <div class="col-md-12"><ContentLoader /></div>
        </div>
      </div>
    </div>
    <!-- Foto -->

    <!-- Vidio -->
    <div class="vidio mt-5 mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="blue-bottom-border border-primary fw-bold text-blue">
              VIDEO KEGIATAN
            </h2>
          </div>
          <div v-if="videos.length > 0" class="row pt-2">
            <div class="col-md-4" v-for="video in videos" :key="video.id">
              <div class="ratio ratio-16x9">
                <iframe
                  :src="video.embed"
                  title="YouTube video"
                  allowfullscreen
                ></iframe>
              </div>
              <p class="fw-semibold">{{ video.title }}</p>
            </div>
          </div>

          <div v-else>
            <div class="col-md-12"><ContentLoader /></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Vidio -->

    <Footer />
  </div>
</template>

<script>
//import content loader
import {
  ContentLoader,
  FacebookLoader,
  BulletListLoader,
} from "vue-content-loader";

import axios from "axios";

import { ref, onMounted } from "vue";

import Header from "../../components/Header.vue";
import Slider from "../../components/Slider.vue";
import Footer from "../../components/Footer.vue";

export default {
  name: "HomeComponent",
  components: {
    ContentLoader,
    FacebookLoader,
    BulletListLoader,
    Header,
    Slider,
    Footer,
  },
  setup() {
    const events = ref([]);
    const events_loader = ref([1]);

    const posts = ref([]);
    const posts_loader = ref([2]);

    const photos = ref([]);
    const photos_loader = ref([3]);

    const videos = ref([]);
    const videos_loader = ref([4]);

    const categories = ref([]);
    const categories_loader = ref([4]);

    onMounted(() => {
      //get posts
      axios.get("/homepage/post").then((response) => {
        posts.value = response.data.data;
      });

      //get events
      axios.get("/homepage/event").then((response) => {
        events.value = response.data.data;
      });

      //get photos
      axios.get("/homepage/photo").then((response) => {
        photos.value = response.data.data;
      });

      // video
      axios.get("/homepage/video").then((response) => {
        videos.value = response.data.data;
      });

      // category
      axios.get("/category").then((response) => {
        categories.value = response.data.data.data;
      });
    });

    return {
      posts,
      posts_loader,
      events,
      events_loader,
      photos,
      photos_loader,
      videos,
      videos_loader,
      categories,
      categories_loader,
    };
  },
};
</script>
