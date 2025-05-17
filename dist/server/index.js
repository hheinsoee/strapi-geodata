"use strict";
const geohash = require("ngeohash");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const geohash__default = /* @__PURE__ */ _interopDefault(geohash);
const bootstrap = ({ strapi }) => {
  strapi.db.lifecycles.subscribe((event) => {
    if (event.action === "beforeCreate" || event.action === "beforeUpdate") {
      for (const key in event.model.attributes) {
        let field = event.model.attributes[key];
        if (field?.customField === "plugin::geodata.geojson") {
          event.params.data.lat = event.params.data[key]?.lat;
          event.params.data.lng = event.params.data[key]?.lng;
          if (event.params.data.lat && event.params.data.lng) {
            event.params.data.geohash = geohash__default.default.encode(event.params.data.lat, event.params.data.lng);
          }
        }
      }
    }
  });
};
const destroy = ({ strapi }) => {
};
const register = ({ strapi }) => {
  strapi.customFields.register({
    name: "geojson",
    plugin: "geodata",
    type: "json",
    inputSize: {
      // optional
      default: 12,
      isResizable: true
    }
  });
};
const config = {
  default: {},
  validator() {
  }
};
const contentTypes = {};
const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin("geodata").service("service").getWelcomeMessage();
  }
});
const controllers = {
  controller
};
const middlewares = {};
const policies = {};
const routes = [
  {
    method: "GET",
    path: "/",
    // name of the controller file & the method.
    handler: "controller.index",
    config: {
      policies: []
    }
  }
];
const service = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  }
});
const services = {
  service
};
const plugin = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
module.exports = plugin;
