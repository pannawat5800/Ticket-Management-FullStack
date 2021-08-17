<template>
  <div class="card-shadow">
    <v-card elevation="0" class="px-1 pb-2 pt-2">
      <v-list-item three-line>
        <v-list-item-content>
          <div v-if="dateCreate === dateUpdate" class="text-caption mb-3">
            CREATE: {{ dateCreate | moment("L - h:mm a") }}
          </div>
          <div v-else class="text-caption mb-2">
            UPDATE: {{ dateUpdate | moment("L - h:mm a") }}
          </div>
          <v-list-item-title class="text-h6 font-weight-medium mb-2">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ description }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar size="60" class="rounded" color="primary">
          <div class="text-h5 white--text">{{ title | capitalize }}</div>
        </v-list-item-avatar>
      </v-list-item>
      <v-card-actions>
        <div
          style="width: 100%"
          class="d-flex justify-space-between align-center"
        >
          <v-chip :color="status | colorStatus" class="font-weight-medium">
            {{ status | capitalizeTotal }}
          </v-chip>
          <v-spacer></v-spacer>
          <div>
            <v-btn text class="ma-2" color="info" depressed @click="onView()">
              View
            </v-btn>
            <v-btn text color="accent" depressed @click="onUpdate()">
              Update
            </v-btn>
          </div>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { StatusColor } from "../utils/stateData.utile";
export default {
  name: "CardTicketComponent",
  props: {
    title: String,
    description: String,
    contact: String,
    dateCreate: String,
    dateUpdate: String,
    status: String,
  },
  filters: {
    capitalize: (value) => value.charAt(0).toUpperCase(),
    capitalizeTotal: (value) => value ? value.toUpperCase() : "",
    colorStatus: (value) => StatusColor[value],
  },
  methods: {
    onView() {
      console.log("on view dialog");
      this.$emit("view");
    },
    onUpdate() {
      this.$emit("update");
    },
  },
};
</script>
<style scoped>
/* .card-shadow {
  box-shadow: 1px 9px 29px 0px rgba(169, 188, 253, 0.31);
  -webkit-box-shadow: 1px 9px 29px 0px rgba(169, 188, 253, 0.31);
  -moz-box-shadow: 1px 9px 29px 0px rgba(169, 188, 253, 0.31);
} */
.card-shadow {
  box-shadow: 1px 9px 29px 0px #A9BCFD33;
  -webkit-box-shadow: 1px 9px 29px 0px #A9BCFD33;
  -moz-box-shadow: 1px 9px 29px 0px #A9BCFD33;
}
</style>