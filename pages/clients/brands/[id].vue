<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { BRANDS_HEADERS_SETUP, type BrandType } from '~/components/clients/Utils';
import ItemForm from "./form.vue";

//models
const totalItems = ref<number>(0);
const items = ref<BrandType[]>([]);
const currentItem = ref<BrandType | undefined>();
const loading = ref<boolean>(true);
const options = ref<any>({});
const searchText = ref<string>("");
const dialog = ref<boolean>(false);
const frmKey = ref<string>(`FrmKey_${new Date().getTime()}`);
const headers = ref(BRANDS_HEADERS_SETUP);
const route = useRoute();
const router = useRouter();
const { confirmDelete, alertSuccess, axiosErrorAlert } = useAlert();

//watchers
watch(options, () => ({
	handler() {
 		reloadList();
	},
	deep: true,
}))

//methods
const reloadList = async() => {
	loading.value = true;
  const { page, itemsPerPage } = options.value;

	const { success, data } = await useAPIFetch("/clients/brands-list", {
		start: page,
		length: itemsPerPage,
		search: searchText.value,
		client_id: route.params.id
    });
    if (success) {
      items.value = data.data.items;
			totalItems.value = data.total;
    }

	loading.value = false;
}

const deleteItem = async(id: number) => {
	confirmDelete(async(_result: any) => {
 		const { data, success, error } = await useApiDeleteFetch('/clients/delete-brand', {
			id
		})
		if(success) {
			alertSuccess(data.data.msg);
			reloadList();
			return;
		} 
		if(error) {
			return axiosErrorAlert(error);
		}
	})
}

const backToClients = () => {
	router.push({ name: "clients" });
}

const add = () => {
	frmKey.value = `FrmKey_${new Date().getTime()}`;
	currentItem.value = undefined;
	dialog.value = true;
}

const edit = (item: any) => {
	currentItem.value = item;
	dialog.value = true;
}

//meta
useSeoMeta({
	title: 'Clients :: Brands',
	ogTitle: 'Clients :: Brands',
})

definePageMeta({
	middleware: 'auth'
})

onMounted(() => {
	reloadList();
})
</script>

<template>
	<v-data-table
		:headers="headers as any"
		:items="items"
		:options.sync="options"
		:server-items-length="totalItems"
		:loading="loading"
		:items-per-page="10"
		:search="searchText"
		class="elevation-1 pa-2"
		:height="550"
	>
		<template v-slot:top>
			<v-row justify="end" class="align-center">
				<v-col cols="12" md="6" lg="3">
					<v-text-field
						v-model="searchText"
						label="Search"
						hide-details
						variant="solo"
						density="compact"
						class="filter-search text-field-component"
					></v-text-field>
				</v-col>
				<v-col cols="auto" class="d-flex ga-2">
					<v-btn color="secondary" @click="add">
						<i class="ph-plus-circle" /> Add brand
					</v-btn>
					<v-btn 
						color="secondary" 
						@click="backToClients"
						size="small"
						icon="ph-caret-circle-left"></v-btn>
				</v-col>
			</v-row>
		</template>
		<template v-slot:item="{ item }">
			<tr>
				<td class="custom-class">{{ item.name }}</td>
				<td>{{ item.brand_rgs_id }}</td>
				<td class="custom-class">
					<v-btn 
						icon="ph-pencil ph-sm"
						color="warning"
						density="compact"
						elevation="0"
						:variant="'elevated'"
						rounded
						class="mx-1" 
						@click.prevent="edit(item)" 
					/>
					<v-btn
						icon="ph-trash ph-sm"
						color="danger"
						density="compact"
						elevation="0"
						:variant="'elevated'"
						rounded
						@click.prevent="deleteItem(item.id)"
					/> 
				</td>
			</tr>
		</template>
	</v-data-table>
 	<v-dialog v-model="dialog" scrollable max-width="600px">
		<item-form 
			:item="currentItem" 
			:key="frmKey" 
			@brands:close-modal="dialog = false"	
			@brands:reload-list="reloadList"
		/>
	</v-dialog>
</template>
