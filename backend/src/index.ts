export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  // bootstrap(/*{ strapi }*/) {},
  // TODO: Remove this is a fix to generate all blurhashes on the existing images. It should be done my now
  bootstrap() {
    const updateAllMediaFiles = async () => {
      const uploads = await strapi.query("plugin::upload.file").findMany();
      for (const item of uploads) {
        if (item.mime && item.mime.startsWith("image/") && !item.blurhash) {
          const blurhash = await strapi
            .plugin("strapi-blurhash")
            .service("blurhash")
            .generateBlurhash(item.url);
          await strapi.db.query("plugin::upload.file").update({
            where: { id: item.id },
            data: {
              blurhash,
            },
          });
        }
      }
      strapi.log.debug("Finished generating blurhash for the library");
    };

    updateAllMediaFiles();
  },
};
