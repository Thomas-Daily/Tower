import { AppState } from "../AppState"
import { api } from "./AxiosService"

class TicketsService {

  async addTicket(eventData) {
    const res = await api.post('api/tickets', eventData)
    const ticket = res.data

    AppState.ticketHolders.push(ticket)
  }

  async removeTicket(ticketHolderId) {
    await api.delete('api/tickets/' + ticketHolderId)
    AppState.ticketHolders = AppState.ticketHolders.filter(t => t.id != ticketHolderId)
  }

  async getMyTickets() {
    const res = await api.get('account/tickets')
    AppState.myTickets = res.data
  }

  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.ticketHolders = res.data
  }
}

export const ticketsService = new TicketsService()