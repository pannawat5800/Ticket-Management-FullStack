<template>
  <v-dialog v-model="dialog" persistent max-width="390">
    <v-card class="py-3">
      <div class="d-flex justify-space-between align-start px-5 py-3">
          
        <div>
          <div class="text-h5 font-weight-medium mb-1">
            {{ title }}
          </div>
          <div v-if="dateCreate === dateUpdate" class="text-caption font-weight-medium mb-2">
            CREATE AT: {{ dateCreate | moment("L - h:mm a") }}
          </div>
          <div v-else class="text-caption font-weight-medium mb-2">
            UPDATE AT: {{ dateUpdate | moment("L - h:mm a") }}
          </div>
          <!-- <div class="text-caption">{{dateCreate | moment("MMM Do YY / h:mm a")}}</div> -->
        </div>
        <div>
          <v-chip :color="status | colorStatus">{{ status | capitalizeTotal}}</v-chip>
        </div>
      </div>

      <v-card-text class="text-body-1 font-weight-meduim">{{ description }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close', false)">
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { StatusColor } from "../utils/stateData.utile";
export default {
  name: "DetailDialog",
  props: {
    dialog: Boolean,
    title: String,
    description: String,
    status: String,
    dateCreate: String,
    dateUpdate: String,
  },
  filters: {
    colorStatus: (value) => StatusColor[value],
    capitalizeTotal: (value) => value ? value.toUpperCase() : "",
  },
};
</script>