import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id || undefined;
    if (!entryId) return next();

    const entry = await strapi.entityService.findOne(
      "api::user-profile.user-profile",
      entryId,
      { populate: "*" }
    );

    if (!entry) return next();
    if (entry.isPublic) return next();

    if (user.id !== entry.user?.id) {
      return ctx.unauthorized(
        "This action is unauthorized. You must be the owner of the user-profile or it has to be public."
      );
    }

    return next();
  };
};
