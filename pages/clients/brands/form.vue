<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { type BrandType } from '~/components/clients/Utils';

	interface BrandsFormI  {
		item?: BrandType 
	}

	//props 
	const props = defineProps<BrandsFormI>();

	//models 
	const route = useRoute();
	const loading = ref<boolean>(false);
	const form = ref<any>({
		name: "",
		brand_rgs_id: "",
		brand_url: "",
		client_id: route.params.id,
		...props.item
	});

	//composables
	const { alertSuccess, axiosErrorAlert } = useAlert();

	//watchers
	watch(props, () => {
		if(props.item) {
			form.value = {
				...form.value,
				...props.item
			}
		}
	});

	//emitters
	const emitters = defineEmits(['brands:close-modal', 'brands:reload-list']);
  
	//methods
	const save = async() => {
		loading.value = true;
		const { success, error, data } = await useApiPostFetch('/clients/save-brand', form.value);
		loading.value = false; 

		if(success) {
			alertSuccess(data.message);
			emitters('brands:close-modal');
			emitters('brands:reload-list')
			return;
		}  
		if(!success && error) { 
			axiosErrorAlert(error);
		}
	}
</script>
<template>
	<CommonCard title="Save Brand">
		<div class="pa-3">
			<v-text-field
				v-model="form.name"
				label="Brand Name"  
				variant="solo"
				density="compact"
				class="filter-search text-field-component"
			/> 
			<v-text-field
				v-model="form.brand_url"
				label="Brand Url" 
				variant="solo"
				density="compact"
				class="filter-search text-field-component"
			/>
			<v-text-field
				v-model="form.brand_rgs_id"
				label="Brand RGS ID" 
				variant="solo"
				density="compact"
				class="filter-search text-field-component"
			></v-text-field>

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
					@click="emitters('brands:close-modal')"
				>
					<i class="ph ph-x" />
					Close
				</v-btn>
			</div>
		</div>
	</CommonCard>
</template> 