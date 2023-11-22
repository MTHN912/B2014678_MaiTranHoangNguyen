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
  <div class="wrapper">

    <AppHeader/>
    
    <div class="text-center content-wrapper ">
      <router-view />
    </div>
    <AppFooter/>
   
    

    
 
   
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>

<script>
import AppHeader from "@/components/AppHeader.vue";
import SliderBar from "@/components/SliderBar.vue";
import AppHeader from "@/components/AppFooter.vue";
////////////////////////////////////////////////
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
/////////////////////////////////////////////////

export default {
  components: {
    AppHeader,
    SliderBar,
    AppFooter
  },
}
</script>


<!-- <template>
  <div class="container">
      <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
              <div class="col-lg-12 login-key">
                  <i class="fa fa-key" aria-hidden="true"></i>
              </div>
              <div class="col-lg-12 login-title">
                  ADMIN 
              </div>

              <div class="col-lg-12 login-form">
                  <div class="col-lg-12 login-form">
                      <form>
                          <div class="form-group">
                              <label class="form-control-label">USERNAME</label>
                              <input type="text" class="form-control">
                          </div>
                          <div class="form-group">
                              <label class="form-control-label">PASSWORD</label>
                              <input type="password" class="form-control" i>
                          </div>

                          <div class="col-lg-12 loginbttm">
                              <div class="col-lg-6 login-btm login-text">
                                
                              </div>
                              <div class="col-lg-6 login-btm login-button">
                                  <button type="submit" class="btn btn-outline-primary">LOGIN</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
              <div class="col-lg-3 col-md-2"></div>
          </div>
      </div>
  </div>
</template>

<style>
 @import "@/assets/admin/admin.css";
</style> -->