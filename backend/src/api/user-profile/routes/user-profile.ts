/**
 * user-profile router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::user-profile.user-profile", {
  config: {
    read: {
      middlewares: ["api::user-profile.is-public-or-owner"],
    },
    find: {
      middlewares: ["api::user-profile.is-public-or-owner"],
    },
    findOne: {
      middlewares: ["api::user-profile.is-public-or-owner"],
    },
    update: {
      middlewares: ["api::user-profile.is-owner"],
    },
    create: {
      middlewares: ["api::user-profile.is-owner"],
    },
    delete: {
      middlewares: ["api::user-profile.is-owner"],
    },
  },
});
