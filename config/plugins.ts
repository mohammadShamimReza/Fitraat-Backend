module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: env("AWS_UPLOAD_PROVIDER"),
      providerOptions: {
        baseUrl: env("CDN_URL"),
        rootPath: env("CDN_ROOT_PATH"),
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_ID"),
            secretAccessKey: env("AWS_SERET_ACCESS_KEY"),
          },
          region: env("AWS_UPLOAD_REGION"),
          params: {
            // ACL: env("AWS_ACL", "public-read"),
            // signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
            Bucket: env("AWS_UPLOAD_BUCKET"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
    email: {
      config: {
        provider: "mailgun",
        providerOptions: {
          key: env("MAILGUN_API_KEY"), // Required
          domain: env("MAILGUN_DOMAIN"), // Required
          url: env("MAILGUN_URL", "https://api.mailgun.net"), //Optional. If domain region is Europe use 'https://api.eu.mailgun.net'
        },
        settings: {
          defaultFrom: "myemail@protonmail.com",
          defaultReplyTo: "myemail@protonmail.com",
        },
      },
    },
  },
  // ...
});
