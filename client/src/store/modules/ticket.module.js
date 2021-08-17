import axios from 'axios';
import { StateFetchDataMap } from '../../utils/stateData.utile';

const url = "http://localhost:3000/api";

const state = {
    tickets: [],
    statusFetchData: StateFetchDataMap.initial,
};

const getters = {
    ticketListAll: (state) => state.tickets,
    stateData: (state) => state.statusFetchData
}

const actions = {
    async createNewTicket({ commit }, data) {
        console.log("create new ticket");
        const response = await axios.put(`${url}/ticket/create`, data);
        commit('setTicketAdded', response.data.data);
    },
    async fetchTickets({ commit }) {
        console.log("start fetch data");
        commit('setFetchStatus', StateFetchDataMap.loading);
        try {
            const response = await axios.get(`${url}/ticket/list`);
            console.log('data: ', response.data);
            commit('setTicketList', response.data.data);
            commit('setFetchStatus', StateFetchDataMap.success);
        } catch (error) {
            commit('setFetchStatus', StateFetchDataMap.error);
        }
    },
    async updateTicketStatus({ commit }, { id, status }) {
        const response = await axios.post(`${url}/ticket/status/update`, { id, status });
        commit('setTicketUpdated', response.data.data);
    }
};
const mutations = {
    setTicketList: (state, list) => (state.tickets = list),
    setTicketAdded: (state, data) => {
        const newList = [data, ...state.tickets];
        console.log('new list: ', newList);
        state.tickets = newList;
    },
    setTicketUpdated: (state, data) => {
        let ticketsList = state.tickets;
        const index = ticketsList.findIndex(element => element._id === data._id);
        console.log("index: ", index);
        ticketsList.splice(index, 1);

        const newList = [data, ...ticketsList];
        console.log("new List: ", newList)
        state.tickets = newList;
    },
    setFetchStatus: (state, status) => (state.statusFetchData = status)

};


export default {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
}