class Controller {
  constructor() {
    // Set our controller name
    this._setControllerName();
    // Find it (node) on page
    this._setContainer();
    // Register all targets for controller
    this._registerTargets();
    // Register our actions
    this._registerActions();
  }

  // We just take our class name (e.g. HelloController) and
  // remove word "Controller" from it.
  // So our this._name is "Hello" now
  _setControllerName() {
    this._name = this.constructor.name.substr(0, this.constructor.name.length - 10);
  }

  // After we obtained name of controller, we can find it on page
  _setContainer() {
    this._container = document.querySelector(`[data-controller="${this._name}"]`);
  }

  _registerTargets() {
    // Find all nodes with data-target attribute
    const targetElements = this._container.querySelectorAll("[data-target]");

    // Loop over nodes 
    Array.from(targetElements).forEach(element => {
      // Get value from data-target and add ability to define
      // more than 1 target separating them with ","
      // e.g. data-target="Hello.name,OtherController.foo"
      const dataTargets = element.getAttribute("data-target").split(",");
      // Loop over such targets
      dataTargets.forEach(dataTarget => {
        // Extract controller and target name
        const [controller, target] = dataTarget.split(".");
        // Assign target to controller if it belongs to it
        if (controller === this._name) {
          // e.g. For hello.name we now have
          // nameTarget property
          this[`${target}Target`] = element;
        }
      })
    });
  }
  _registerActions() {
    // Very similar to _registerTargets, but
    // we also need to extract trigger to create
    // appropriate event listener
    const actionElements = this._container.querySelectorAll("[data-action]");
    Array.from(actionElements).forEach(element => {
      const dataActions = element.getAttribute("data-action").split(",");
      dataActions.forEach(action => {
        const trigger = action.split("->")[0];
        const funcName = action.split("#")[1];
        element.addEventListener(trigger, (e) => {
          // If function is defined in your Controller
          // it will be called after event triggered
          if (this[funcName] !== undefined) {
            this[funcName](e);
          }
        });
      })
    });
  }
}
