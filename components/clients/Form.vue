<script setup lang="ts">
import type { ClientType } from './Utils';

interface ClientsFormI {
	item?: ClientType | undefined
}

//composables
const { alertSuccess, axiosErrorAlert } = useAlert();

//props
const props = defineProps<ClientsFormI>();

//models
const loading = ref<boolean>(false);
const form = ref<any>({
  name: "",
	legal_name: "",
	regulated: 0,
	rev_share: "GGR",
	tax: "",
	bet_limits: "",
	client_rgs_id: "", 
	...props.item,
	currencies: props.item?.clientCurrencies || []
});

//watchers
watch(props, () => {
	if(props.item) {
		form.value = { 
			...form.value,
			...props.item,
			currencies: props.item.clientCurrencies
		}
	}
});
 
//emitters
const emitters = defineEmits(['clients:reload-list', 'clients:close-modal']);

//methods
const save = async() => {
	loading.value = true;
	const { success, error, data } = await useApiPostFetch('/clients/save', form.value);
	loading.value = false; 

	if(success) {
			alertSuccess(data.message);
			emitters('clients:close-modal');
			emitters('clients:reload-list')
			return;
		}  
		if(!success && error) { 
			axiosErrorAlert(error);
		}
}

const changeCurrency = (_value: any) => {
	form.value.currencies = _value;
}
</script>
<template>
	<CommonCard title="Save Client"> 
	 	<div class="pa-3">
			<v-text-field
				v-model="form.name"
				label="Client Commercial name"
				variant="solo"
				density="compact"
				class="filter-search text-field-component"
      />
			<v-text-field
				v-model="form.legal_name"
				label="Legal name" 
				variant="solo"
				density="compact"
				class="filter-search text-field-component"
			/>
			<v-text-field
				v-model="form.bet_limits"
				label="Bet limits" 
				variant="solo"
				density="compact"
				class="filter-search text-field-component"
		 	/>
			<v-text-field
				v-model="form.client_rgs_id"
				label="Client RGS ID" 
				variant="solo"
				density="compact"
				class="filter-search text-field-component"
			/>
        <v-select
          v-model="form.rev_share"
          :items="['GGR', 'NGR']"
          label="Rev Share model"
					variant="solo"
					density="compact"
					class="filter-search text-field-component"
        ></v-select>

        <selector-currency
          v-model="form.currencies"
          :default-value="form.currencies"
          :displayExchangeButton="false"
          :multiple="true"
					@model-update="changeCurrency"
        />

				<div class="d-flex justify-center align-center mt-3 ga-2">
					<v-btn
						:disabled="loading"
						color="success"
						class="btn btn-primary"
						type="button"
						@click="save"
					>
					<i class="ph ph-floppy-disk" />
					Save
				</v-btn>

				<v-btn
					color="secondary"
					@click="emitters('clients:close-modal')"
				>
					<i class="ph ph-x" />
					Close
				</v-btn>
			</div>
		</div>
	</CommonCard>
</template>