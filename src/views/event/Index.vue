<template>
  <div id="event">
    <Header />

    <div class="container pt-5" id="halaman_agenda">
      <div class="row pt-2 g-2 mb-2">
        <div class="col-md-12">
          <h2 class="blue-bottom-border fw-bold text-blue">AGENDA SEKOLAH</h2>
        </div>
      </div>
      <div class="row pt-2 g-2 mb-2" v-if="events.length > 0">
        <div class="col-md-6" v-for="event in events" :key="event.id">
          <router-link
            :to="{ name: 'detail_event', params: { slug: event.slug } }"
            class="text-decoration-none text-blue"
          >
            <div class="card border-dark mb-3">
              <div class="card-header bg-transparent border-dark">
                {{ event.title }}
              </div>
              <div class="card-body">
                <p><i class="bi bi-building"></i> {{ event.location }}</p>
                <p><i class="bi-alarm"></i> {{ event.date }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div v-else>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <FacebookLoader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { FacebookLoader } from "vue-content-loader";

import { ref, onMounted } from "vue";

import axios from "axios";

import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";

export default {
  name: "EventComponent",

  components: {
    Header,
    Footer,
    FacebookLoader,
  },
  setup() {
    //define state
    const events = ref([]);
    const events_loader = ref([1]);

    //define state moteExists
    let moreExists = ref(false);
    let nextPage = ref(0);

    const fetchDataEvents = () => {
      axios.get("/event").then((response) => {
        events.value = response.data.data.data;

        if (response.data.data.current_page < response.data.data.last_page) {
          moreExists.value = true;

          nextPage.value = response.data.data.current_page + 1;
        } else {
          moreExists.value = false;
        }
      });
    };

    const loadMore = () => {
      axios.get(`/event?page${nextPage.value}`).then((response) => {
        if (response.data.data.current_page < response.data.data.last_page) {
          moreExists = true;
          nextPage = response.data.data.current_page + 1;
        } else {
          moreExists = false;
        }

        response.data.data.data.forEach((data) => {
          events.value.push(data);
        });
      });
    };

    //run hook on Mounted
    onMounted(() => {
      fetchDataEvents();
    });

    return {
      events,
      events_loader,
      moreExists,
      nextPage,
      loadMore,
    };
  },
};
</script>
