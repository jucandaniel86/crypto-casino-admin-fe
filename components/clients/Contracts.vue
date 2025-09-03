<script setup lang="ts">
import type { OperatorType } from './Utils';

interface ClientsFormI {
	item: OperatorType
}

enum ContractTypesEnum {
	REV = "REV",
	TIERS = "TIERS"
}

//composables
const { alertSuccess, axiosErrorAlert } = useAlert();

//props
const props = defineProps<ClientsFormI>();

//models
const loading = ref<boolean>(false);
const loadingOperator = ref<boolean>(false);
const operator = ref<any>();
const form = ref<any>({
	contract_type: ContractTypesEnum.REV,
	rev_share: 0,
	tiers: [],
});
const contractType = ref<any[]>([
	{ val: ContractTypesEnum.REV, label: 'Revshare' },
	{ val: ContractTypesEnum.TIERS, label: 'Tiers' }
])

//watchers
watch(props.item, async () => {
	if (props.item) {
		form.value = {
			...form.value,
			...props.item,
		}
	}
	await loadOperator();
});

//emitters
const emitters = defineEmits(['clients:reload-list', 'clients:close-contracts-modal']);

//methods
const save = async () => {
	loading.value = true;
	let success, error, data;

	if (form.value.contract_type === ContractTypesEnum.TIERS) {
		const { success, error, data } = await useApiPostFetch('/clients/save-tiers', {
			tiers: [...form.value.tiers],
			site_id: props.item.site_id
		});

		if (success) {
			//@ts-ignore
			alertSuccess(data?.data.msg);
			emitters('clients:close-contracts-modal');
			emitters('clients:reload-list')
			return;
		}
		if (!success && error) {
			axiosErrorAlert(error);
		}
	}

	if (form.value.contract_type === ContractTypesEnum.REV) {

		const { success, error, data } = await useApiPostFetch('/clients/save-operator-rev-share', {
			rev_share: form.value.rev_share,
			site_id: props.item.site_id
		});

		if (success) {
			//@ts-ignore
			alertSuccess(data?.data.msg);
			emitters('clients:close-contracts-modal');
			emitters('clients:reload-list')
			return;
		}
		if (!success && error) {
			axiosErrorAlert(error);
		}
	}

	loading.value = false;
}

const loadOperator = async () => {
	loadingOperator.value = true;
	const { success, error, data } = await useAPIFetch('/clients/operator-with-tiers', {
		site_id: props.item.site_id
	});
	loadingOperator.value = false;

	if (success) {
		operator.value = data.data;
		if (Array.isArray(data.data.tiers) && data.data.tiers.length > 0) {
			data.data.tiers.forEach((el: any) => {
				addTier(el);
			})
		}
		else {
			addTier();
		}

		form.value.rev_share = data.data.rev_share;
		if (data.data.contract_type) {
			form.value.contract_type = data.data.contract_type;
		}
	}
}

const addTier = (_payload: any = undefined) => {
	form.value.tiers.push({
		range_from: "",
		range_to: "",
		rev_share: "",
		site_id: props.item.site_id,
		..._payload,
	})
}

const deleteTier = (_index: number) => {
	form.value.tiers.splice(_index, 1);
}

onMounted(() => {
	loadOperator();
});
</script>
<template>
	<CommonCard :title="`Contracts ${props.item?.name}`" :loading="loadingOperator">
		<div class="pa-3">
			<v-select v-model="form.contract_type" label="Contract Type" :items="contractType" item-value="val"
				item-title="label" hide-details />

			<div class="d-flex justify-center align-center mt-3 ga-2" v-if="form.contract_type === ContractTypesEnum.REV">
				<v-text-field label="Revshare" prepend-icon="mdi-percent" v-model="form.rev_share" hide-details variant="solo"
					class="text-field-component" density="compact"></v-text-field>
			</div>

			<div v-if="form.contract_type === ContractTypesEnum.TIERS">
				<v-table width="100%" density="compact" height="300px" fixed-header>
					<thead>
						<tr>
							<th class="text-left" colspan="2" width="70%">
								GGR
							</th>
							<th class="text-left">
								Revshare %
							</th>
							<th></th>
						</tr>
						<tr>
							<th>FROM</th>
							<th>TO</th>
							<th colspan="2"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(tier, i) in form.tiers" :key="`Tier${i}`">
							<td class="pt-1 pb-1">
								<v-text-field v-model="tier.range_from" hide-details variant="solo" density="compact"
									class="text-field-component" />
							</td>
							<td>
								<v-text-field v-model="tier.range_to" hide-details variant="solo" density="compact"
									class="text-field-component" />
							</td>
							<td>
								<v-text-field v-model="tier.rev_share" hide-details variant="solo" density="compact"
									class="text-field-component" prepend-icon="mdi-percent" />
							</td>
							<td>
								<v-btn icon="ph-sm ph-trash" color="secondary" density="compact" elevation="0" :variant="'elevated'"
									rounded class="mx-1" @click.prevent="deleteTier(i)" />
							</td>
						</tr>
					</tbody>
				</v-table>
				<div class="d-flex w-100 justify-end">
					<v-btn color="secondary" density="compact" elevation="0" :variant="'elevated'" rounded class="mx-1"
						@click.prevent="addTier">
						<v-icon icon="ph-sm ph-plus" />
						Add new tier
					</v-btn>
				</div>
			</div>

			<div class="d-flex justify-center align-center mt-3 ga-2">
				<v-btn :disabled="loading" color="success" class="btn btn-primary" type="button" @click="save">
					<i class="ph ph-floppy-disk" />
					Save
				</v-btn>

				<v-btn color="secondary" @click="emitters('clients:close-contracts-modal')">
					<i class="ph ph-x" />
					Close
				</v-btn>
			</div>
		</div>
	</CommonCard>
</template>