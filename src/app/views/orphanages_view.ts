import Orphanage from '../models/Orphanage'
import imagesView from './images_view'

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      phone: orphanage.phone,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
    }
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  renderMany(orphanages: Orphanage[]) {
    return orphanages.map((orphanage) => this.render(orphanage))
  },
}
