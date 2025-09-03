<script lang="ts" setup>
import { computed, ref } from "vue";
import MenuComponents from "@/components/layouts/leftSideBar/verticalLayout/MenuComponents.vue";
import RailMenuComponent from "@/components/layouts/leftSideBar/verticalLayout/RailMenuComponent.vue";
//@ts-ignore
import { useLayoutStore } from "@/store/app";
import {
  LAYOUTS,
  SIDEBAR_SIZE,
  LAYOUT_THEME,
  LAYOUT_POSITION,
} from "@/app/config";
import { watch } from "vue";
import { useAuthStore } from "@/store/auth";

const state = useLayoutStore();
const {
  public: { appName, version },
} = useRuntimeConfig();
const { user } = useAuthStore();

const mobileNavigationDrawer = ref(false);
const envDisabled = ref<boolean>(false);

const navigationDrawer = computed(() => {
  return state.layoutType === LAYOUTS.VERTICAL && !isSmallSideBar.value;
});

const isSmallSideBar = computed(() => {
  return state.sideBarSize === SIDEBAR_SIZE.SMALL;
});

const isCompactSideBar = computed(() => {
  return state.sideBarSize === SIDEBAR_SIZE.COMPACT;
});

const isScrollableLayout = computed(() => {
  return state.position === LAYOUT_POSITION.SCROLLABLE;
});

const sideBarSize = computed(() => {
  return state.sideBarSize;
});

const verticalDrawerWidth = computed(() => {
  if (isCompactSideBar.value) {
    return 180;
  } else if (state.layoutTheme === LAYOUT_THEME.INTERACTION) {
    return 230;
  }

  return 250;
});

watch(sideBarSize, () => {
  mobileNavigationDrawer.value = !mobileNavigationDrawer.value;
});
</script>
<template>
  <v-navigation-drawer
    v-if="$vuetify.display.smAndUp"
    v-model="navigationDrawer"
    :width="verticalDrawerWidth"
    :absolute="isScrollableLayout"
    :permanent="$vuetify.display.smAndUp"
    temporary
    :style="
      isScrollableLayout ? 'overflow-y: auto' : 'height: unset !important'
    "
  >
    <div class="app-menu navbar-menu h-100">
      <div class="navbar-brand-box">
        <router-link to="/" class="logo logo-dark">
          <span class="logo-lg">
            {{ appName }} <sup>{{ version }}</sup>
          </span>
        </router-link>
        <router-link to="/" class="logo logo-light">
          <span class="logo-lg">
            {{ appName }} <sup>{{ version }}</sup>
          </span>
        </router-link>
        <v-btn text="" class="header-item btn-vertical-sm-hover">
          <i class="ri-record-circle-line"></i>
        </v-btn>
      </div>

      <div
        data-simplebar
        id="scrollbar"
        :style="!isScrollableLayout ? 'height: calc(100vh - 75px)' : ''"
        ref="scrollbar"
        class="vertical-layout-sidebar"
      >
        <MenuComponents />
      </div>
      <div class="sidebar-background"></div>
    </div>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-else
    v-model="mobileNavigationDrawer"
    :width="250"
    temporary
  >
    <div class="app-menu navbar-menu">
      <div class="navbar-brand-box">
        <router-link to="/" class="logo logo-dark"> </router-link>
        <router-link to="/" class="logo logo-light"> </router-link>
        <v-btn text="" class="header-item btn-vertical-sm-hover">
          <i class="ri-record-circle-line"></i>
        </v-btn>
      </div>

      <div
        data-simplebar
        id="scrollbar"
        :style="
          $vuetify.display.smAndUp
            ? (!isScrollableLayout && 'height: calc(100vh - 80px);') || ''
            : 'height: 100vh'
        "
        ref="scrollbar"
        class="mobile-navigation-drawer"
      >
        <MenuComponents />
      </div>
      <div class="sidebar-background"></div>
    </div>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-if="$vuetify.display.smAndUp && !navigationDrawer"
    v-model="isSmallSideBar"
    :rail-width="70"
    rail
    permanent
    class="vertical-navigation-drawer-rail"
    style="height: unset !important"
  >
    <div class="d-flex justify-center navbar-brand-box">
      <v-btn icon href="/" class="logo" variant="text"> </v-btn>
    </div>
    <v-divider />
    <div
      data-simplebar
      id="rail-scrollbar"
      :style="!isScrollableLayout ? 'height: calc(100vh - 100px)' : ''"
    >
      <RailMenuComponent />
    </div>
  </v-navigation-drawer>
</template>
<style scoped>
.logo-lg {
  color: #fff;
  font-size: 1.2rem;
}

.logo-lg sup {
  font-size: 0.6rem;
}
</style>
