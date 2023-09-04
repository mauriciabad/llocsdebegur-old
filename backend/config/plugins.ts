export default ({ env }) => ({
  upload: {
    config: {
      provider: "local",
    },
  },
  "apollo-sandbox": {
    enabled: process.env.NODE_ENV === "production" ? false : true,
  },
  placeholder: {
    enabled: true,
    config: {
      size: 16,
    },
  },
});
