<script setup lang="ts">
import { type BrandType, type OperatorType } from './Utils';

interface TaxesFormI {
	item: OperatorType;
}

//props
const props = defineProps<TaxesFormI>();

//models
const form = ref<any>({
	brand_id: "",
	country_id: "",
	tax: "",
	brand_rgs_id: "",
	id: 0
});
const isSave = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const items = ref<any>([]);
const errors = ref<any>([]);
const brand = ref<BrandType | undefined>();
const title = ref<string>("Taxes");

//computed
const modalName = computed(() => `${title.value} for ${props.item.name}`)

//composables
const { alertSuccess, axiosErrorAlert, confirmDelete } = useAlert();

//watch
watch(brand, () => {
	if (!brand.value) return;

	form.value.brand_id = brand.value.id;
	form.value.brand_rgs_id = brand.value.brand_rgs_id;
})

//emits 
const emitters = defineEmits(['clients:close-taxes-modal', 'clients:on-taxes-confirm'])

//methods
const closeModal = () => emitters('clients:close-taxes-modal');

const resetForm = () => {
	form.value = {
		brand_id: "",
		country_id: "",
		tax: "",
		brand_rgs_id: "",
	}
	brand.value = undefined;
}

const save = async () => {
	isSave.value = true;
	const { success, error, data } = await useApiPostFetch('/clients/save-tax', {
		...form.value,
		brand_id: form.value.brand_id ? form.value.brand_id.id : 0,
		country_id: form.value.country_id ? form.value.country_id.id : 0
	});
	isSave.value = false;

	if (success) {
		alertSuccess(data.message);
		resetForm();
		reloadList();
		return;
	}
	if (!success && error) {
		axiosErrorAlert(error);
	}
}

const reloadList = async () => {
	isLoading.value = true;

	const { success, data } = await useAPIFetch("/clients/taxes-list", {
		client_id: props.item.id
	});
	if (success) {
		items.value = data.data;
	}

	isLoading.value = false;
}

const edit = async (item: any) => {
	const { success, error, data } = await useApiPostFetch('/clients/save-tax', item);

	if (success) {
		alertSuccess(data.message);
		return;
	}
	if (!success && error) {
		axiosErrorAlert(error);
	}
}

const deleteItem = async (id: number) => {

	await confirmDelete(async (_result: any) => {
		const { data, success, error } = await useApiDeleteFetch('/clients/delete-tax', {
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

onMounted(() => {
	reloadList();
})
</script>
<template>
	<v-card>
		<v-card-title class="pa-1">{{ modalName }}</v-card-title>
		<v-card-text class="pa-2">
			<v-row class="d-flex align-start mb-3">
				<v-col cols="3">
					<selector-brands v-model="form.brand_id" :client="item.id as any" :default-value="form.brand_id" />
					<v-alert type="error" v-if="errors.brand_id" class="pa-0 mb-0" style="font-size: 0.8rem">
						{{ errors.country_id[0] }}
					</v-alert>
				</v-col>
				<v-col cols="3">
					<selector-country v-model="form.country_id" :default-value="form.country_id" />
					<v-alert type="error" v-if="errors.country_id" class="pa-0 mb-0" style="font-size: 0.8rem">
						{{ errors.country_id[0] }}
					</v-alert>
				</v-col>
				<v-col cols="3">
					<v-text-field v-model="form.tax" label="Tax" hide-details variant="solo" density="compact"
						class="filter-search text-field-component" />

					<v-alert type="error" v-if="errors.tax" class="pa-0 mb-0" style="font-size: 0.8rem">
						{{ errors.tax[0] }}
					</v-alert>
				</v-col>
				<v-col cols="2">
					<v-btn @click.prevent="save" :disabled="isSave" color="primary" small class="mt-0">
						<i class="ph ph-floppy-disk" />
						Save
					</v-btn>
				</v-col>
			</v-row>

			<v-table fixed-header height="350" :loading="isLoading" density="compact" class="table-component">
				<thead class="bg-light">
					<th>Brand</th>
					<th>Country</th>
					<th>Tax</th>
					<th width="20%">Act/ions</th>
				</thead>

				<tbody>
					<tr v-for="(item, i) in items" :key="`Taxes${i}`">
						<td>{{ item.brand ? item.brand.name : "N/A" }}</td>
						<td>{{ item.country ? item.country.name : "N/A" }}</td>
						<td valign="middle">
							<v-text-field v-model="item.tax" hide-details variant="solo" density="compact"
								class="filter-search text-field-component mt-1 mb-1" />
						</td>
						<td>
							<v-btn icon="ph-pencil ph-sm" color="warning" density="compact" elevation="0" :variant="'elevated'"
								rounded class="mx-1" @click.prevent="edit(item)" />
							<v-btn icon="ph-trash ph-sm" color="danger" density="compact" elevation="0" :variant="'elevated'" rounded
								@click.prevent="deleteItem(item.id)" />
						</td>
					</tr>
				</tbody>
			</v-table>
		</v-card-text>
		<v-card-actions class="justify-end">
			<v-btn color="secondary" @click="closeModal">
				<i class="ph ph-x" />
				Close
			</v-btn>
		</v-card-actions>
	</v-card>
</template>