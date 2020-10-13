import Image from '../models/Image'

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render(image: Image) {
    return {
      id: image.id,
      path: `${process.env.API_URL}/uploads/${image.path}`,
    }
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  renderMany(images: Image[]) {
    return images.map((image) => this.render(image))
  },
}
