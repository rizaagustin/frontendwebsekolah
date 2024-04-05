<template>
  <div id="contact">
    <Header />
    <div class="container" id="halaman_detail_agenda">
      <div class="row">
        <div class="col-md-12">
          <h2 class="blue-bottom-border border-primary fw-bold text-blue">
            KONTAK
          </h2>
        </div>
        <div class="col-md-12">
          <div class="card border-0 shadow-sm rounded">
            <div class="card-title">
              Jl. Biru Laut no 3, Daerah Khusus Ibukota Jakarta, Indonesia
              (+62822-1285-2112)
            </div>
            <div class="card-body">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15866.889621186814!2d106.8239502!3d-6.167915!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f567d8adcb6f%3A0xde490e60a9a44e65!2sIstana%20Negara!5e0!3m2!1sid!2sid!4v1712172719507!5m2!1sid!2sid"
                width="100%"
                height="600"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";

export default {
  name: "ContactComponent",
  components: {
    Header,
    Footer,
  },
};
</script>
