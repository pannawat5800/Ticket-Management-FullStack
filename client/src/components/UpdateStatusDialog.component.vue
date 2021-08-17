<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card class="py-3">
      <v-card-title>
        <span class="text-h5 font-weight-medium">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-select
            v-model="statusSelected"
            :items="statusList"
            label="Select"
            :value="status"
            required
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined @click="clear"> clear </v-btn>
        <v-btn depressed color="primary" class="mr-4" @click="onSubmit()">
          confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "UpdateStatusDialog",
  props: {
    dialog: Boolean,
    id: String,
    title: String,
    status: String,
    dateCreate: String,
    dateUpdate: String,
  },
  data: () => ({
      valid: true,
      statusSelected: "",
      statusList: ["pending", "accepted", "resolved", "rejected"],
  }),
  watch: {
    status: function (value) {
      this.statusSelected = value;
    },
  },
  methods: {
    onSubmit() {
      this.$emit("confirmUpdate", {
        id: this.id,
        status: this.statusSelected,
      });
    },
    clear() {
      this.$emit("cancle");
    },
  },
};
</script>