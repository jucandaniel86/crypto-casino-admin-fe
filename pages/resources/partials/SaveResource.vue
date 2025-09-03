<script setup lang="ts">
import { useScroll } from "@vueuse/core";

//types
type SaveResourceT = {
  gameId: number | string;
};
enum ResourceEnum {
  TEXT = "text",
  FILE = "file",
  TEXTAREA = "textarea",
  NUMBER = "number",
}
type ResourceType = {
  id?: number;
  resourceType: ResourceEnum | null;
  resourceContent: any;
  resourceLabel: string;
  gameID: string | number;
  operatorID: any;
  language: any;
  field_id?: any;
};

//props
const props = defineProps<SaveResourceT>();

//models
const resources = ref<ResourceType[]>([]);
const itemsList = ref<HTMLDivElement>();
const operatorID = ref<string | number | null>();
const language = ref<string | null>();
const resourceType = ref<any>();
const fieldsLoading = ref<boolean>(false);

//composables
const { y } = useScroll(itemsList, { behavior: "smooth" });
const { axiosErrorAlert, alertSuccess } = useAlert();

//computed
const canAdd = computed(
  () => operatorID.value && language.value && resourceType.value
);

//emitters
const emitters = defineEmits(["onModalClose"]);

//methods
const add = () => {
  if (!canAdd.value) return;

  const eq = resources.value.some((resource) => {
    return (
      resource.resourceLabel === resourceType.value.field_label &&
      resource.language === language.value &&
      resource.operatorID === operatorID.value
    );
  });

  if (eq) return;

  resources.value.push({
    resourceType: resourceType.value.field_type,
    resourceContent: "",
    resourceLabel: resourceType.value.field_label,
    gameID: props.gameId,
    operatorID: operatorID.value,
    language: language.value,
    field_id: resourceType.value.id,
  });
};
const deleteResource = (resource: ResourceType, index: number) => {
  if (!resource.id) {
    resources.value.splice(index, 1);
  }
};

const getFields = async (): Promise<void> => {
  fieldsLoading.value = true;
  const { data } = await useAPIFetch("/resources/get", {
    operatorID: operatorID.value,
    gameID: props.gameId,
  });

  if (data && Array.isArray(data.fields)) {
    resources.value = data.fields.map((field: any) => ({
      resourceType: field.field_type,
      resourceContent: field.content,
      resourceLabel: field.field_label,
      gameID: field.game_id,
      operatorID: field.operator_id,
      language: field.language,
      field_id: field.field_id,
    }));
  }

  fieldsLoading.value = false;
};

const save = async (): Promise<void> => {
  const ResourcesToSave = resources.value.map((resource) => ({
    operator_id: resource.operatorID,
    language: resource.language,
    content: resource.resourceContent,
    game_id: resource.gameID,
    field_id: resource.field_id,
  }));

  const { success, data, error } = await useApiPostFetch(
    `/resources/save-resources`,
    {
      fields: ResourcesToSave,
      game_id: props.gameId,
      operator_id: operatorID.value,
    }
  );
  if (success) {
    return alertSuccess(data.message);
  }

  if (!success && error) {
    axiosErrorAlert(error);
  }
};

watch(operatorID, () => {
  if (!operatorID.value) resources.value = [];
  getFields();
});

watch(
  resources,
  () => {
    nextTick(() => {
      y.value = itemsList.value?.scrollHeight as number;
    });
  },
  { deep: true }
);
</script>
<template>
  <v-card class="mb-2">
    <v-card-title>{{ `Resources for game ${props.gameId}` }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <SelectorOperators v-model="operatorID" />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="language"
            label="Language"
            hide-details
            variant="solo"
            density="compact"
            class="filter-search text-field-component"
            style="min-width: 200px"
          />
        </v-col>
        <v-col cols="3">
          <SelectorResource
            v-model="resourceType"
            :operatorId="operatorID"
            @input="(v) => (resourceType = v)"
          />
        </v-col>
        <v-col cols="1">
          <v-btn color="primary" block :disabled="!canAdd" @click.prevent="add">
            <v-icon size="small" color="white" icon="mdi-plus" />
            Add
          </v-btn>
        </v-col>
      </v-row>
      <div class="items__list" ref="itemsList">
        <v-alert v-if="!operatorID" type="info" variant="tonal"
          >Please select an operator</v-alert
        >
        <v-progress-linear
          v-if="fieldsLoading"
          color="green"
          indeterminate
        ></v-progress-linear>
        <TransitionGroup name="list">
          <v-row
            v-for="(resource, index) in resources"
            :key="resource as any"
            align-center
          >
            <v-col cols="6" class="pt-1 pb-1">
              <v-textarea
                v-if="resource.resourceType === ResourceEnum.TEXTAREA"
                :rows="3"
                :cols="2"
                v-model="resource.resourceContent"
                hide-details
                variant="solo"
                density="compact"
                class="filter-search text-field-component"
                :label="`${resource.resourceLabel}`"
              />
              <v-text-field
                v-if="
                  [ResourceEnum.TEXT, ResourceEnum.NUMBER].indexOf(
                    resource.resourceType as any
                  ) !== -1
                "
                v-model="resource.resourceContent"
                :type="resource.resourceType as any"
                hide-details
                variant="solo"
                density="compact"
                class="filter-search text-field-component"
                :label="`${resource.resourceLabel}`"
              />
              <v-file-input
                v-if="resource.resourceType === ResourceEnum.FILE"
                v-model="resource.resourceContent"
                :label="`${resource.resourceLabel}`"
              />
            </v-col>
            <v-col cols="2" class="pt-1 pb-1">
              <v-chip>{{ resource.operatorID }}</v-chip>
            </v-col>
            <v-col cols="2" class="pt-1 pb-1">
              <v-chip>Language: {{ resource.language }}</v-chip>
            </v-col>
            <v-col cols="2" class="pt-1 pb-1">
              <v-btn
                @click="deleteResource(resource, index)"
                color="red"
                size="small"
                icon="mdi-delete-outline"
              />
            </v-col>
          </v-row>
        </TransitionGroup>
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between w-100">
      <v-btn @click.prevent="save" color="primary">
        <v-icon icon="mdi-content-save" />
        Save
      </v-btn>
      <v-btn
        color="primary"
        size="small"
        @click.prevent="emitters('onModalClose')"
      >
        <v-icon>mdi-close</v-icon>
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<style>
@import url(../styles/resources.css);
</style>
