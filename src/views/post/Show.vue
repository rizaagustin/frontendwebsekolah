<template>
  <div id="post-detail">
    <Header />
    <div class="container pt-5" id="halaman_detail_agenda">
      <div class="row pt-2 g-2 mb-2">
        <div class="col-md-8">
          <h2 class="blue-bottom-border fw-bold text-blue">BERITA SEKOLAH</h2>
          <img :src="post.image" class="img-fluid w-100 mt-2" alt="..." />
          <p class="text-muted">
            <i class="bi bi-calendar-fill"></i>&nbsp;{{ post.created_at }}
          </p>
          <h3 class="mt-2">{{ post.title }}</h3>
          <div v-html="post.content"></div>
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
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";

import { useRoute } from "vue-router";

import { FacebookLoader } from "vue-content-loader";

export default {
  name: "PostDetailComponent",
  components: {
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();
    const post = ref({});
    const events = ref([]);
    const categories = ref([]);
    const events_loader = ref(1);
    const categories_loader = ref(2);

    onMounted(() => {
      axios.get(`/post/${route.params.slug}`).then((response) => {
        post.value = response.data.data;
      });

      axios.get("/homepage/event").then((response) => {
        events.value = response.data.data;
      });

      axios.get("/category").then((response) => {
        categories.value = response.data.data.data;
      });
    });

    return {
      post,
      events,
      categories,
      events_loader,
      categories_loader,
    };
  },
};
</script>
