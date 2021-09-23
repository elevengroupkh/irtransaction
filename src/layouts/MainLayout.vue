<template>
  <q-layout view="lHh LpR lFf" v-if="!loading">
    <q-header
      reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />
        <!--          <q-avatar>-->
        <!--            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">-->
        <!--          </q-avatar>-->

        <q-toolbar-title></q-toolbar-title>
        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-select
          v-model="lang"
          :options="langOptions"
          dense
          outlined
          emit-value
          map-options
          options-dense
          bg-color="white"
        />
        <q-btn
          flat
          round
          dense
          icon="fas fa-sign-out-alt"
          @click="logoutNotify"
        />

      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="left"
      style="background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;"
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <!--<q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>-->

            <q-toolbar-title>{{ user.email }}</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item
                active-class="tab-active"
                to="/dashboard"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
                v-if="user.role == 1 || user.role == 7"
              >
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>

                <q-item-section>
                  Dashboard
                </q-item-section>
              </q-item>

              <!--<q-item
                active-class="tab-active"
                to="/dashboard_v2"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>

                <q-item-section>
                  Dashboard v2
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/dashboard_v3"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>

                <q-item-section>
                  Dashboard v3
                </q-item-section>
              </q-item>-->

              <q-expansion-item
                icon="pages"
                label="Transactions"
              >
                <q-list class="q-pl-lg">
                  <q-item
                    active-class="tab-active"
                    to="/cashin"
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                      Cash In
                    </q-item-section>
                  </q-item>
                  <!--<q-item
                    active-class="tab-active"
                    to="/cashout"
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                      Cash Out
                    </q-item-section>
                  </q-item>-->
                </q-list>
              </q-expansion-item>

              <q-expansion-item
                icon="pages"
                label="Master Data"
                v-if="user.role == 1 || user.role == 7"
              >
                <q-list class="q-pl-lg">
                  <q-item
                    active-class="tab-active"
                    to="/shift_management"
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                      Shift
                    </q-item-section>
                  </q-item>
                  <q-item
                    active-class="tab-active"
                    to="/position_management"
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                      Position
                    </q-item-section>
                  </q-item>
                  <q-item
                    active-class="tab-active"
                    to="/bank_management"
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                      Bank
                    </q-item-section>
                  </q-item>
                  <q-item
                    active-class="tab-active"
                    to="/companyaccount_management"
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                      Company Bank Account
                    </q-item-section>
                  </q-item>
                  <q-item
                    active-class="tab-active"
                    to="/blacklist_management"
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                      Black List
                    </q-item-section>
                  </q-item>
                  <q-item
                    active-class="tab-active"
                    to="/user_management"
                    class="q-ma-sm navigation-item"
                    clickable
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                      User Management
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>

              <!--<q-item
                active-class="tab-active"
                to="/customer_management"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="star" />
                </q-item-section>

                <q-item-section>
                  Customer Management
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/change_request"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="send" />
                </q-item-section>

                <q-item-section>
                  Change Request
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/sales_invoices"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="attach_money" />
                </q-item-section>

                <q-item-section>
                  Sales Invoices
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/quotes"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="money" />
                </q-item-section>

                <q-item-section>
                  Quotes
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/transactions"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="assignment" />
                </q-item-section>

                <q-item-section>
                  Transactions
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/employee_salary_list"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>

                <q-item-section>
                  Employee Salary List
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/calendar"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="calendar_today" />
                </q-item-section>

                <q-item-section>
                  Calendar
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/department"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="business" />
                </q-item-section>

                <q-item-section>
                  Department
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/my_profile"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="drafts" />
                </q-item-section>

                <q-item-section>
                  My Profile
                </q-item-section>
              </q-item>-->
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false,
      user : '',
      loading : true,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'kh', label: 'Khmer' }
      ]
    };
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
    }
  },
  methods: {
    async logoutNotify() {

      await this.$axios.get('api/logout')
      .then((response)=>{
        if (response.data.status=='ok'){
          this.$router.push('/')
        }
        this.$q.notify({
          message: "Logged out"
        });
      })


    },
    async getuser() {

      await this.$axios.get('api/user')
      .then((response)=>{

        this.user = response.data
        this.$store.commit('auth/setUser', response.data)
        this.loading = false
      })


    }
  },
  async mounted() {
    await this.getuser()
  }
};
</script>

<style>
.q-drawer {
  /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
  background-image: url("/statics/images/lake.jpg") !important;
  background-size: cover !important;
}

.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: green;
}

body {
  background: #f1f1f1 !important;
}

.header_normal {
  background: linear-gradient(
    145deg,
    rgb(32, 106, 80) 15%,
    rgb(21, 57, 102) 70%
  );
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
}
</style>
