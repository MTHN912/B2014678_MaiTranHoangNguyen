
<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link :to="{ name: 'account' }" tag="button" class="nav-link" style="color:black;">Trang Chủ</router-link>
      </li>



    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <div v-if="!userInfor">
        <li class="nav-item ">
          <router-link :to="{ name: 'account.register' }" class="nav-link" style="color:black;">
            <i class="fas fa-user-plus"></i>
            Đăng ký

          </router-link>
        </li>

        <li class="nav-item">
          <router-link :to="{ name: 'account.login' }" class="nav-link" style="color:black;">
            <i class="fas fa-user"></i>
            Đăng nhập

          </router-link>
        </li>
      </div>
      <div v-else>
        <li class="nav-item text-black">
          {{ user[0].username }}
        </li>

        <li class="nav-item text-white">
          <button class="btn btn-light ml-1" @click="logout">
            Đăng Xuất
          </button>
        </li>
      </div>
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

    </ul>
  </nav>
  <!-- /.navbar -->
</template>
<script>
export default {

  data() {
    return {
      user: ''
    }
  },
  methods: {
    async logout() {
      this.$cookies.remove('user')
      await this.$router.push({ name: 'account.login' })
      location.reload()

    },
    getUserInfo() {
      this.user = this.$cookies.get('user')
      console.log(this.user)

    }
  },
  computed: {
    userInfor() {
      this.getUserInfo()
      return this.user
    }
  },
  // mounted(){
  // this.userInfor()
  // }
};



</script>