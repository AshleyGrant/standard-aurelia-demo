define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.message = 'Hello World!';
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('welcome',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Welcome = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var Welcome = exports.Welcome = (_class = function () {
    function Welcome() {
      _classCallCheck(this, Welcome);

      this.heading = 'Welcome to Aurelia!';

      _initDefineProp(this, 'firstName', _descriptor, this);

      this.lastName = 'Doe';
    }

    Welcome.prototype.submit = function submit() {
      alert('Welcome, ' + this.fullName + '!');
    };

    _createClass(Welcome, [{
      key: 'fullName',
      get: function get() {
        return this.firstName + ' ' + this.lastName;
      }
    }]);

    return Welcome;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'firstName', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'John';
    }
  })), _class);
});
define('users',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'whatwg-fetch'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Users(http) {
      _classCallCheck(this, Users);

      this.heading = 'Github Users';
      this.users = [];

      http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
      });

      this.http = http;
    }

    Users.prototype.activate = function activate() {
      var _this = this;

      return this.http.fetch('users').then(function (response) {
        return response.json();
      }).then(function (users) {
        return _this.users = users;
      });
    };

    return Users;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1></template>"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><section class=\"col-sm-4\"><h2>${heading}</h2><form role=\"form\" submit.trigger=\"submit()\"><div class=\"form-group\"><label for=\"fn\">First Name</label><input type=\"text\" value.bind=\"firstName\" class=\"form-control\" id=\"fn\" placeholder=\"first name\"></div><div class=\"form-group\"><label for=\"ln\">Last Name</label><input type=\"text\" value.bind=\"lastName\" class=\"form-control\" id=\"ln\" placeholder=\"last name\"></div><div class=\"form-group\"><label>Full Name</label><p class=\"help-block\">${fullName}</p></div><button type=\"submit\" class=\"btn btn-default\">Submit</button> <input type=\"checkbox\" ref=\"doDumbStuff\"></form></section><welcome if.bind=\"doDumbStuff.checked\" first-name.two-way=\"firstName\"></welcome></template>"; });
define('text!users.html', ['module'], function(module) { module.exports = "<template><section><h2>${heading}</h2><div class=\"row\"><div class=\"col-sm-6 col-md-3 card-container\" repeat.for=\"user of users\"><div class=\"card\"><div class=\"avatar\"><img src.bind=\"user.avatar_url\" crossorigin ref=\"image\"></div><div class=\"content\"><p class=\"name\">${user.login}</p><p><a target=\"_blank\" class=\"btn btn-default\" href.bind=\"user.html_url\">Contact</a></p></div></div></div></div></section></template>"; });
//# sourceMappingURL=app-bundle.js.map