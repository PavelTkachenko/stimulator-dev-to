class Controller {
  constructor() {
    // Set our controller name
    this._setControllerName();
    // Find it (node) on page
    this._setContainer();
    // Register all targets for controller
    this._registerTargets();
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
}
