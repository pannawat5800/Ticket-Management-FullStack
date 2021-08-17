<template>
  <v-container>
    <div class="px-5 pb-10 pt-8">
      <v-row align="center" justify="space-between">
        <div class="mr-3">
          <div class="text-h5 font-weight-medium">Tickets List</div>
        </div>
        <div>
          <v-btn
            depressed
            class="mr-4"
            color="primary"
            @click="$router.push('create')"
            >ADD</v-btn
          >
          <v-btn outlined color="primary" @click="fetchTickets()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </div>
      </v-row>
    </div>
    <div class="pb-5">
      <v-divider></v-divider>
    </div>
    <div v-if="stateData === stateFetchDataMap.success">
      <div v-if="ticketListAll.length !== 0">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(data, index) in ticketListAll"
            :key="index"
          >
            <CardTicketComponent
              :title="data.title"
              :description="data.description"
              :dateCreate="data.date_create"
              :dateUpdate="data.date_update"
              :status="data.status"
              @view="openDetailDialog(data)"
              @update="openUpdateStatusDialog(data)"
            />
          </v-col>
        </v-row>
      </div>
      <div v-else style="height:500px" class="d-flex flex-column justify-center align-center">
        <v-icon size="100" color="accent"> speaker_notes </v-icon>
        <div class="text-h5 font-weight-medium mt-5">No Ticket Item</div>
      </div>
    </div>

    <div v-else-if="stateData === stateFetchDataMap.loading">
      <div
        style="height: 500px"
        class="d-flex flex-column align-center justify-center"
      >
        <v-progress-circular
          :size="120"
          color="accent"
          :width="15"
          indeterminate
        ></v-progress-circular>
        <div class="text-h5 pt-3">Please waiting</div>
      </div>
    </div>
    <div v-else-if="stateData === stateFetchDataMap.error">
      <div style="height: 500px" class="d-flex flex-column">
        <v-icon color="accent" size="100">highlight_off</v-icon>
        <div class="text-h5 pt-10">Please waiting</div>
      </div>
    </div>
    <div v-else></div>
    <DetailDialog
      :dialog="dialogDetail"
      :title="selectedDetail.title"
      :description="selectedDetail.description"
      :status="selectedDetail.status"
      :dateCreate="selectedDetail.date_create"
      :dateUpdate="selectedDetail.date_update"
      v-on:close="closeDetailDialog"
    />
    <UpdateStatusDialog
      :dialog="dialogUpdateStatus"
      :id="selectedUpdate._id"
      :title="selectedUpdate.title"
      :status="selectedUpdate.status"
      v-on:confirmUpdate="onUpdateStatus"
      v-on:cancle="closeUpdateStatus"
    />
    <LoadingDialogComponent :dialog="dialogLoading" />
    <v-snackbar :timeout="3000" v-model="successUpdateSneckbar" color="success">
      Update Ticket Status Successfully.
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="successUpdateSneckbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar :timeout="3000" v-model="errorUpdateSneckbar" color="error">
      Update Ticket Status Failed.
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="errorUpdateSneckbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { StateFetchDataMap } from "../utils/stateData.utile";
import CardTicketComponent from "../components/CardTicket.component.vue";
import UpdateStatusDialog from "../components/UpdateStatusDialog.component.vue";
import LoadingDialogComponent from "../components/LoadingDialog.component.vue";
import DetailDialog from "../components/DetailDialog.component.vue";

export default {
  name: "TicketListPage",
  components: {
    CardTicketComponent,
    UpdateStatusDialog,
    LoadingDialogComponent,
    DetailDialog,
  },
  data: () => ({
    dialogDetail: false,
    dialogUpdateStatus: false,
    dialogLoading: false,
    successUpdateSneckbar: false,
    errorUpdateSneckbar: false,
    stateFetchDataMap: StateFetchDataMap,
    selectedUpdate: {},
    selectedDetail: {},
  }),
  methods: {
    ...mapActions(["fetchTickets", "updateTicketStatus"]),
    openDetailDialog(data) {
      this.selectedDetail = data;
      this.dialogDetail = true;
    },
    openUpdateStatusDialog(data) {
      console.log("update data: ", data);

      this.selectedUpdate = data;
      this.dialogUpdateStatus = true;
    },
    async onUpdateStatus(data) {
      this.dialogUpdateStatus = false;
      if (data.status === this.selectedUpdate.status) {
        this.selectedUpdate = {};
        return;
      }

      this.dialogLoading = true;
      try {
        await this.updateTicketStatus(data);
        this.successUpdateSneckbar = true;
      } catch (error) {
        console.log("error update: ", error);
        this.errorUpdateSneckbar = true;
      }
      this.dialogLoading = false;
    },
    closeDetailDialog() {
      this.dialogDetail = false;
      this.selectedDetail = {};
    },
    closeUpdateStatus() {
      this.dialogUpdateStatus = false;
      this.selectedUpdate = {};
    },
  },
  computed: {
    ...mapGetters(["ticketListAll", "stateData"]),
  },
  created() {
    this.fetchTickets();
  },
};
</script>