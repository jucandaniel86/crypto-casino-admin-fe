<script setup lang="ts">
import { useRouter } from "vue-router";
import { CLIENTS_HEADERS_SETUP, type OperatorType } from "./Utils";

//components
import ClientsForm from "./Form.vue";
import TaxesForm from '~/components/clients/Taxes.vue';
import Contracts from "./Contracts.vue";
import moment from "moment";

//composables
const { confirmDelete, alertSuccess, axiosErrorAlert } = useAlert();

//models 
const totalItems = ref<number>(0);
const items = ref<any[]>([]);
const loading = ref<boolean>(true);
const searchText = ref<string>("");
const options = ref<any>({});
const selectedItem = ref<OperatorType | undefined>();
const modal = ref<boolean>(false);
const dialogTaxes = ref<boolean>(false);
const modalContracts = ref<boolean>(false);
const headers = ref(CLIENTS_HEADERS_SETUP);
const router = useRouter();

//watchers 
watch(options, () => ({
	handler() {
		reloadList();
	},
	deep: true,
}))

const reloadList = async () => {
	loading.value = true;
	const { page, itemsPerPage } = options.value;

	const { success, data } = await useAPIFetch("/clients/list", {
		start: page,
		length: itemsPerPage,
		search: searchText.value,
	});
	if (success) {
		items.value = data.data.items;
		totalItems.value = data.total;
	}

	loading.value = false;
}

const deleteItem = async (id: number) => {
	confirmDelete(async (_result: any) => {
		const { data, success, error } = await useApiDeleteFetch('/clients/delete', {
			id
		})
		if (success) {
			alertSuccess(data.data.msg);
			reloadList();
			return;
		}
		if (error) {
			return axiosErrorAlert(error);
		}
	})
}

const goToBrands = (itemID: number) => {
	router.push(`clients/brands/${itemID}`);
}

const taxes = (_item: OperatorType) => {
	selectedItem.value = _item;
	dialogTaxes.value = true;
}

const confirmDeleteTaxes = () => {
	dialogTaxes.value = !dialogTaxes.value;
}

const contracts = (_item: OperatorType) => {
	modalContracts.value = true;
	selectedItem.value = _item;
}

const convertDate = (_date: string) => moment(_date).format("DD-MM-YYYY HH:mm:ss");

const closeContractsModal = () => {
	modalContracts.value = false;
}

//mounted
onMounted(() => {
	reloadList();
});
</script>
<template>
	<v-data-table :headers="headers as any" :items="items" :options.sync="options" :server-items-length="totalItems"
		:loading="loading" :search="searchText" class="elevation-1 pa-2" :height="550">
		<template v-slot:top>
			<v-row justify="end" class="align-center">
				<v-col cols="12" md="6" lg="3">
					<v-text-field v-model="searchText" label="Search" hide-details variant="solo" density="compact"
						class="filter-search text-field-component"></v-text-field>
				</v-col>
			</v-row>
		</template>
		<template v-slot:item="{ item }">
			<tr>
				<td>
					<h5 class="text-h6">{{ item.name }}</h5>
					<v-chip size="x-small">Last Update: {{ convertDate(item.updated_at) }}</v-chip>
				</td>
				<td>{{ item.site_id }}</td>
				<td>{{ item.rgs_id }}</td>
				<td>
					<v-btn icon="ph-sm ph-plus" color="secondary" density="compact" elevation="0" :variant="'elevated'" rounded
						class="mx-1" @click.prevent="contracts(item)" />
				</td>
				<td>
					<v-btn icon="ph-sm ph-plus" :disabled="item.brands_count === 0" color="secondary" density="compact"
						elevation="0" :variant="'elevated'" rounded class="mx-1" @click.prevent="taxes(item)" />
				</td>
				<td>
					<v-btn icon="ph-sm ph-plus" color="secondary" density="compact" elevation="0" :variant="'elevated'" rounded
						class="mx-1" @click.prevent="goToBrands(item.id)" />
				</td>
			</tr>
		</template>
	</v-data-table>
	<v-dialog v-model="dialogTaxes" scrollable max-width="800px">
		<taxes-form v-if="selectedItem" :item="selectedItem" @clients:close-taxes-modal="dialogTaxes = false"
			@clients:on-taxes-confirm="confirmDeleteTaxes" />
	</v-dialog>
	<v-dialog v-model="modalContracts" scrollable max-width="800px">
		<Contracts v-if="selectedItem" :item="selectedItem" @clients:close-contracts-modal="closeContractsModal" />
	</v-dialog>
</template>