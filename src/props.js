export default {
  props: {
    id: {
      type: String,
      default: `JwDraw-${~~(new Date())}`
    },
    // 背景图
    background: {
      type: [Object, String],
      default: () => {
        return '';
      }
    }
  },
}