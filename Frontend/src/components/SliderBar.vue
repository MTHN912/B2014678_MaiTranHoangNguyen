<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a style="margin-left: 77px;">
      <img src="../assets/icons/logo2.png" alt="" height="70" width="95">
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <!-- <img src="../assets/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> -->
        </div>
        <div class="info">
          <!-- <a href="#" class="d-block">Alexander Pierce</a> -->
          <router-link :to="{ name: 'user' }" tag="button" class="nav-link d-block"
            style="color:white; font-size: 20px; font-family: 'Courier New', Courier, monospace; font-weight: 15px;">Delay Airways</router-link>
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
                <a class="nav-link ">
                  <router-link :to="{ name: 'account' }" tag="button" class="far fa-circle nav-icon"></router-link>
                  Quản Lý Người Dùng
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link">
                  <router-link :to="{ name: 'product' }" tag="button" class="far fa-circle nav-icon"></router-link>
                  <p>Quản lí sản phẩm</p>
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link">
                  <router-link :to="{ name: 'brand' }" tag="button" class="far fa-circle nav-icon"></router-link>
                  <p>Quản lí danh mục</p>
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
</template>