interface Plugin {
    register: any;
    bootstrap: any;
    destroy: any;
    config: any;
    controllers: any;
    routes: any;
    services: any;
    contentTypes: any;
    policies: any;
    middlewares: any;
}
declare const plugin: Plugin;
export default plugin;
