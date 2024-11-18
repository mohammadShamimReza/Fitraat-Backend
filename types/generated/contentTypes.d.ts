import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    age: Attribute.Integer & Attribute.Required;
    phone: Attribute.BigInteger & Attribute.Required & Attribute.Unique;
    compliteDay: Attribute.Integer;
    country: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Bangladesh'>;
    videoComplete: Attribute.Boolean & Attribute.DefaultTo<false>;
    kagelComplete: Attribute.Boolean & Attribute.DefaultTo<false>;
    quizComplete: Attribute.Boolean & Attribute.DefaultTo<false>;
    sortNoteComplete: Attribute.Boolean & Attribute.DefaultTo<false>;
    gender: Attribute.Enumeration<['male', 'female']> & Attribute.Required;
    language: Attribute.Enumeration<['English', 'Bangla']> &
      Attribute.Required &
      Attribute.DefaultTo<'English'>;
    currentDay: Attribute.Integer & Attribute.DefaultTo<1>;
    saves_blogs: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::blog.blog'
    >;
    posts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::post.post'
    >;
    post_like: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'api::post-like.post-like'
    >;
    post_comments: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::post-comment.post-comment'
    >;
    startDate: Attribute.Date & Attribute.Required;
    paid: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    tran_id: Attribute.String;
    varifiedSine: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    singularName: 'blog';
    pluralName: 'blogs';
    displayName: 'Blog';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    topic: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    imageURL: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'https://i.ibb.co/fY0F1Xw/stopPorn.png'>;
    keywords: Attribute.JSON;
    viewCount: Attribute.BigInteger &
      Attribute.Required &
      Attribute.DefaultTo<'01'>;
    day: Attribute.Relation<'api::blog.blog', 'oneToOne', 'api::day.day'>;
    content: Attribute.RichText;
    BlogId: Attribute.Integer;
    user: Attribute.Relation<
      'api::blog.blog',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    authorName: Attribute.String & Attribute.DefaultTo<'Mohammad Shamim Reza'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiDayDay extends Schema.CollectionType {
  collectionName: 'days';
  info: {
    singularName: 'day';
    pluralName: 'days';
    displayName: 'Day';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blog: Attribute.Relation<'api::day.day', 'oneToOne', 'api::blog.blog'>;
    kegel: Attribute.Relation<'api::day.day', 'oneToOne', 'api::kegel.kegel'>;
    video: Attribute.Relation<'api::day.day', 'oneToOne', 'api::video.video'>;
    sort_note: Attribute.Relation<
      'api::day.day',
      'oneToOne',
      'api::sort-note.sort-note'
    >;
    DayId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    quizzes: Attribute.Relation<
      'api::day.day',
      'oneToMany',
      'api::quiz-contant.quiz-contant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::day.day', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::day.day', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiEmergencyEmergency extends Schema.CollectionType {
  collectionName: 'emergencies';
  info: {
    singularName: 'emergency';
    pluralName: 'emergencies';
    displayName: 'emergency';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    vedio_url: Attribute.String;
    message: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::emergency.emergency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::emergency.emergency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFreeBlogFreeBlog extends Schema.CollectionType {
  collectionName: 'free_blogs';
  info: {
    singularName: 'free-blog';
    pluralName: 'free-blogs';
    displayName: 'FreeBlog';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    topic: Attribute.String;
    title: Attribute.String;
    imageURL: Attribute.String;
    keywords: Attribute.JSON;
    viewCount: Attribute.BigInteger;
    content: Attribute.RichText;
    authorName: Attribute.String & Attribute.DefaultTo<'Mohammad Shamim Reza'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::free-blog.free-blog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::free-blog.free-blog',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiKagelTimeKagelTime extends Schema.CollectionType {
  collectionName: 'kagel_times';
  info: {
    singularName: 'kagel-time';
    pluralName: 'kagel-times';
    displayName: 'kegelTime';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    kegels: Attribute.Relation<
      'api::kagel-time.kagel-time',
      'manyToMany',
      'api::kegel.kegel'
    >;
    kagelTimeId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    times: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'2, 5, 6, 8, 8, 9, 6, 2, 1, 1'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kagel-time.kagel-time',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::kagel-time.kagel-time',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiKegelKegel extends Schema.CollectionType {
  collectionName: 'kegels';
  info: {
    singularName: 'kegel';
    pluralName: 'kegels';
    displayName: 'kegel';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    day: Attribute.Relation<'api::kegel.kegel', 'oneToOne', 'api::day.day'>;
    KagelId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    kegel_times: Attribute.Relation<
      'api::kegel.kegel',
      'manyToMany',
      'api::kagel-time.kagel-time'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kegel.kegel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::kegel.kegel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts';
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.Text;
    user: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    post_likes: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::post-like.post-like'
    >;
    post_comments: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::post-comment.post-comment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPostCommentPostComment extends Schema.CollectionType {
  collectionName: 'post_comments';
  info: {
    singularName: 'post-comment';
    pluralName: 'post-comments';
    displayName: 'postComment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    user: Attribute.Relation<
      'api::post-comment.post-comment',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    post: Attribute.Relation<
      'api::post-comment.post-comment',
      'manyToOne',
      'api::post.post'
    >;
    comment: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::post-comment.post-comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::post-comment.post-comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostLikePostLike extends Schema.CollectionType {
  collectionName: 'post_likes';
  info: {
    singularName: 'post-like';
    pluralName: 'post-likes';
    displayName: 'PostLike';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    post: Attribute.Relation<
      'api::post-like.post-like',
      'manyToOne',
      'api::post.post'
    >;
    user: Attribute.Relation<
      'api::post-like.post-like',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::post-like.post-like',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::post-like.post-like',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuizContantQuizContant extends Schema.CollectionType {
  collectionName: 'quiz_contants';
  info: {
    singularName: 'quiz-contant';
    pluralName: 'quiz-contants';
    displayName: 'QuizContant';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    question: Attribute.String & Attribute.Required & Attribute.Unique;
    answer: Attribute.String & Attribute.Required & Attribute.Unique;
    quizOptions: Attribute.String & Attribute.Required;
    quizId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    day: Attribute.Relation<
      'api::quiz-contant.quiz-contant',
      'manyToOne',
      'api::day.day'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::quiz-contant.quiz-contant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::quiz-contant.quiz-contant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSortNoteSortNote extends Schema.CollectionType {
  collectionName: 'sort_notes';
  info: {
    singularName: 'sort-note';
    pluralName: 'sort-notes';
    displayName: 'SortNote';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    sortNoteContent: Attribute.RichText &
      Attribute.Required &
      Attribute.DefaultTo<'\u0986\u09B2\u09CD\u09B2\u09BE\u09B9\u09B0 \u0995\u09BE\u099B\u09C7 \u09B8\u09CE \u09A5\u09BE\u0995\u09BE \u0986\u09B0 \u09A8\u09BF\u099C\u09C7\u09B0 \u09AC\u09BF\u09AC\u09C7\u0995\u09C7\u09B0 \u0995\u09BE\u099B\u09C7 \u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A8\u09CD\u09A8 \u09A5\u09BE\u0995\u09BE \u09B8\u09AC\u09A5\u09C7\u0995\u09C7 \u0995\u09A0\u09BF\u09A8\uD83D\uDE13 \u0986\u09B2\u09CD\u09B2\u09BE\u09B9\u09CD \u0986\u09AE\u09BE\u0995\u09C7 \u0986\u09B0 \u0986\u09AA\u09A8\u09BE\u09A6\u09C7\u09B0 \u09B8\u09AC\u09BE\u0987\u0995\u09C7 \u098F\u0987\u09B8\u09AC \u09AB\u09C7\u09CE\u09A8\u09BE \u09A5\u09C7\u0995\u09C7 \u09B9\u09C7\u09AB\u09BE\u099C\u09A4 \u0995\u09B0\u09C1\u0995\u0964\u0964\u0986\u09AE\u09C0\u09A8'>;
    day: Attribute.Relation<
      'api::sort-note.sort-note',
      'oneToOne',
      'api::day.day'
    >;
    sortNoteId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sort-note.sort-note',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sort-note.sort-note',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubscriberSubscriber extends Schema.CollectionType {
  collectionName: 'subscribers';
  info: {
    singularName: 'subscriber';
    pluralName: 'subscribers';
    displayName: 'Subscriber';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    email: Attribute.Email & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subscriber.subscriber',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subscriber.subscriber',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVideoVideo extends Schema.CollectionType {
  collectionName: 'videos';
  info: {
    singularName: 'video';
    pluralName: 'videos';
    displayName: 'Video';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    VideoUrl: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'https://www.youtube.com/embed/7WUKdCV8J34'>;
    day: Attribute.Relation<'api::video.video', 'oneToOne', 'api::day.day'>;
    videoId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::video.video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::video.video',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::blog.blog': ApiBlogBlog;
      'api::day.day': ApiDayDay;
      'api::emergency.emergency': ApiEmergencyEmergency;
      'api::free-blog.free-blog': ApiFreeBlogFreeBlog;
      'api::kagel-time.kagel-time': ApiKagelTimeKagelTime;
      'api::kegel.kegel': ApiKegelKegel;
      'api::post.post': ApiPostPost;
      'api::post-comment.post-comment': ApiPostCommentPostComment;
      'api::post-like.post-like': ApiPostLikePostLike;
      'api::quiz-contant.quiz-contant': ApiQuizContantQuizContant;
      'api::sort-note.sort-note': ApiSortNoteSortNote;
      'api::subscriber.subscriber': ApiSubscriberSubscriber;
      'api::video.video': ApiVideoVideo;
    }
  }
}
