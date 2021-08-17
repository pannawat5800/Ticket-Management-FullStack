import Vue from 'vue';
import Vuex from 'vuex';
import TicketModule from './modules/ticket.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { TicketModule }
})