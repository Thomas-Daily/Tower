import { AppState } from "../AppState"
import { Event2 } from "../models/Event2"
import { router } from "../router"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {

  async getEvents(type = '') {
    let res
    if (type) {
      res = await api.get('/api/events', {
        params: {
          type: type
        }
      })
    } else {
      res = await api.get('/api/events')
    }
    AppState.events = res.data
    //.map(e => new Event(e))
  }

  async createEvent(formData) {
    const res = await api.post('api/events', formData)
    AppState.events.unshift(res.data)
    return (res.data)
    // logger.log(formData)
  }

  async getEventById(id) {
    const res = await api.get(`/api/events/${id}`)
    AppState.activeEvent = res.data
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`/api/events/${eventId}`)
    AppState.activeEvent = res.data
  }
}

export const eventsService = new EventsService()