<script setup lang="ts">
	import LeftSideBar from '@/components/layouts/leftSideBar/index.vue'
	import TopBar from "@/components/layouts/topBar/index.vue";

	const isHorizontal = true;
</script>
<template>
	<v-app>
		<v-layout
      class="main-layout-wrapper justify-center position-relative"
      id="layout-wrapper"
    >
		<LeftSideBar />
		<TopBar />
		<v-main app>
			<v-container
				:class="!isHorizontal ? 'pt-0' : ''"
				:fluid="!isHorizontal"
				class="main-container"
			>
				<slot />
			</v-container>
		</v-main>
		
		<v-footer app class="footer">
			<v-container fluid>
				<v-row>
					<v-col class="pa-0">
						{{ new Date().getFullYear() }} © RGSInvocing.
					</v-col>
			 	</v-row>
			</v-container>
		</v-footer>
	 </v-layout>
	</v-app>
</template>