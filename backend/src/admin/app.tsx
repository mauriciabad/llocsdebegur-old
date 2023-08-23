import favicon from './extensions/favicon.png';

export default {
  config: {
    locales: ['es'],
    head: {
      favicon: favicon,
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
