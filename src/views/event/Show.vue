<template>
  <div id="event-detail">
    <Header />

    <div class="container pt-5" id="halaman_detail_agenda">
      <div class="row pt-2 g-2 mb-2">
        <div class="col-md-8">
          <h2 class="blue-bottom-border fw-bold text-blue">
            {{ event.title }}
          </h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="card border-dark mb-3">
            <div class="card-header bg-transparent border-dark">
              {{ event.title }}
            </div>
            <div class="card-body">
              <p><i class="bi bi-building"></i> {{ event.location }}</p>
              <p><i class="bi-alarm"></i> {{ event.date }}</p>
              <div v-html="event.content"></div>
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

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import { FacebookLoader } from "vue-content-loader";
import { ref, onMounted } from "vue";

import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import { useRoute } from "vue-router";

export default {
  name: "EventDetailComponent",
  components: {
    Header,
    Footer,
    FacebookLoader,
  },
  setup() {
    const event = ref({});
    const events = ref([]);
    const events_loader = ref(2);
    const categories = ref([]);

    const route = useRoute();

    onMounted(() => {
      axios
        .get(`http://rizaags.my.id:89/api/event/${route.params.slug}`)
        .then((response) => {
          event.value = response.data.data;
        });

      axios.get("http://rizaags.my.id:89/api/event").then((response) => {
        events.value = response.data.data.data;
      });

      axios.get("http://rizaags.my.id:89/api/category").then((response) => {
        categories.value = response.data.data.data;
      });
    });

    return {
      event,
      events,
      categories,
      events_loader,
    };
  },
};
</script>
