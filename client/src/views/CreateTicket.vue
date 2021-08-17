<template>
  <v-container style="max-width: 600px">
    <div class="text-h5 py-4 font-weight-bold">Create New Ticket</div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row justify="end">
        <v-col cols="12">
          <v-text-field
            v-model="title"
            :rules="titleRules"
            label="Title"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="description" label="Description"></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="contact"
            :rules="contactRules"
            :counter="10"
            label="Contact"
            placeholder="0111111111"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="mt-5 d-flex flex-row-reverse">
        <v-btn color="primary" @click="onSubmit"> Confirm </v-btn>
        <v-btn color="info" class="mr-5" @click="$router.push('/')">
          Cancle
        </v-btn>
      </div>
    </v-form>
    <LoadingDialogComponent :dialog="isLoading" />
    <v-snackbar :timeout="3000" v-model="snackbar" color="error">
      Create New ticket Failed.
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import LoadingDialogComponent from "../components/LoadingDialog.component.vue";
import { mapActions } from "vuex";
export default {
  name: "CreateTicketPage",
  components: {
    LoadingDialogComponent,
  },
  data: () => ({
    valid: false,
    isLoading: false,
    snackbar: false,
    title: "",
    description: "",
    contact: "",
    titleRules: [(v) => !!v || "Title is required"],
    contactRules: [
      (v) => !!v || "Contact is required",
      (v) => /^[0-9]/.test(v) || "Contact must be contain only 0-9.",
      (v) => v.length === 10 || "Contact must be 10 characters",
    ],
  }),
  methods: {
    ...mapActions(["createNewTicket"]),
    async onSubmit() {
      if (!this.$refs.form.validate()) return;

      this.isLoading = true;
      try {
        await this.createNewTicket({
          title: this.title,
          description: this.description,
          contact: this.contact,
        });
        this.$router.push("/");
        
      } catch (error) {
        console.error("create error: ", error);
        this.snackbar = true;
      }
      this.this.isLoading = false;
    },
  },
};
</script>