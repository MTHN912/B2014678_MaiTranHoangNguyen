<style>
@import 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback';
@import '../assets/admin/all.min.css';
@import '../assets/admin/tempusdominus-bootstrap-4.min.css';
@import '../assets/admin/icheck-bootstrap.min.css';
@import '../assets/admin/jqvmap.min.css';
@import '../assets/admin/adminlte.min.css';
@import '../assets/admin/OverlayScrollbars.min.css';
@import '../assets/admin/daterangepicker.css';
@import '../assets/admin/summernote-bs4.min.css';

</style>

<template>
  <div class="wrapper">

    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link">Trang Chủ</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link">Đăng Xuất</a>
        </li>
      </ul>

      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <!-- Navbar Search -->
        <li class="nav-item">
          <a class="nav-link" data-widget="navbar-search" href="#" role="button">
            <i class="fas fa-search"></i>
          </a>
          <div class="navbar-search-block">
            <form class="form-inline">
              <div class="input-group input-group-sm">
                <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-navbar" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
                  <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>



        <li class="nav-item">
          <a class="nav-link" data-widget="fullscreen" href="#" role="button">
            <i class="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
            <i class="fas fa-th-large"></i>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="index3.html" class="brand-link">
        <!-- <img src="../assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
          style="opacity: .8"> -->
        <span class="brand-text font-weight-light">AdminLTE 3</span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <!-- <img src="../assets/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> -->
          </div>
          <div class="info">
            <a href="#" class="d-block">Alexander Pierce</a>
          </div>
        </div>

        <!-- SidebarSearch Form -->
        <div class="form-inline">
          <div class="input-group" data-widget="sidebar-search">
            <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
              <button class="btn btn-sidebar">
                <i class="fas fa-search fa-fw"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <!-- Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library -->
            <li class="nav-item menu-open">
              <!-- <a href="#" class="nav-link active">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a> -->
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a  class="nav-link active">
                    <router-link :to="{name: 'project.add'}" tag="button" class="far fa-circle nav-icon">Quản lí người dùng</router-link>
                    
                  </a>
                </li>
                <li class="nav-item">
                  <a href="../index2.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Quản lí sản phẩm</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="../index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Quản lí giỏ hàng</p>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">


    </div>



    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
  </div>
</template>

<script>

import '../assets/admin/jquery.min.js';
import '../assets/admin/jquery-ui.min.js';
import '../assets/admin/bootstrap.bundle.min.js';
import '../assets/admin/Chart.min.js';
import '../assets/admin/sparkline.js';
import '../assets/admin/jquery.vmap.min.js';
import '../assets/admin/jquery.vmap.usa.js';
import '../assets/admin/jquery.knob.min.js';
// import '../assets/admin/moment.min.js';
// import '../assets/admin/daterangepicker.js';
// import '../assets/admin/tempusdominus-bootstrap-4.min.js';
import '../assets/admin/summernote-bs4.min.js';
import '../assets/admin/jquery.overlayScrollbars.min.js';
import '../assets/admin/adminlte.js';
import '../assets/admin/dashboard.js';
$.widget.bridge('uibutton', $.ui.button)

export default {
}
</script>
