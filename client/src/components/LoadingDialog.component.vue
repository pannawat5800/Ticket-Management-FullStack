<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card class="py-3" >
      <div style="height: 200px" class="d-flex flex-column justify-center align-center">
        <v-progress-circular
          :size="60"
          :width="7"
          color="accent"
          indeterminate
        ></v-progress-circular>
        <div class="text-h6 pt-10">Please waiting</div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "LoadingDialogComponent",
  props: {
    dialog: Boolean,
  },
};
</script>