<style>

@import './assets/admin/all.min.css';
@import './assets/admin/tempusdominus-bootstrap-4.min.css';
@import './assets/admin/icheck-bootstrap.min.css';
@import './assets/admin/jqvmap.min.css';
@import './assets/admin/adminlte.min.css';
@import './assets/admin/OverlayScrollbars.min.css';
@import './assets/admin/daterangepicker.css';
@import './assets/admin/summernote-bs4.min.css';

</style>


<template>
  <div >

    <AppHeader/>
    <!-- <SliderBar/> -->
    <div class="pt-3 pb-3 ">
      <router-view />
    </div>
    <AppFooter/>
   
   
  </div>
</template>



<script>
import AppHeader from "@/components/AppHeader.vue";
import SliderBar from "@/components/SliderBar.vue";
import AppFooter from "@/components/AppFooter.vue";


////////////////////____ADMIN_______////////////////////////////
import './assets/admin/jquery.min.js';
import './assets/admin/jquery-ui.min.js';
import './assets/admin/bootstrap.bundle.min.js';
import './assets/admin/Chart.min.js';
import './assets/admin/sparkline.js';
import './assets/admin/jquery.vmap.min.js';
import './assets/admin/jquery.vmap.usa.js';
import './assets/admin/jquery.knob.min.js';
// import '../assets/admin/moment.min.js';
// import '../assets/admin/daterangepicker.js';
// import '../assets/admin/tempusdominus-bootstrap-4.min.js';
import './assets/admin/summernote-bs4.min.js';
import './assets/admin/jquery.overlayScrollbars.min.js';
import './assets/admin/adminlte.js';
import './assets/admin/dashboard.js';
$.widget.bridge('uibutton', $.ui.button)

/////////////////////______FORM DUY_______////////////////////////////



export default {
  components: {
    AppHeader,
    SliderBar,
    AppFooter,
  },
}
</script>


