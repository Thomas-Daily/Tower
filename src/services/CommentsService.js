import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService {

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.activeComments = res.data
  }

  async createComment(formData) {
    const res = await api.post(`api/comments`, formData)
    AppState.activeComments.push(new Comment(res.data))
    logger.log(formData)
  }

  async deleteComment(id) {
    const yes = await Pop.confirm('Delete this comment?')
    if (!yes) { return }
    console.log(id)
    await api.delete(`api/comments/${id}`)
    AppState.activeComments = AppState.activeComments.filter(c => c.id != id)
  }
}

export const commentsService = new CommentsService()