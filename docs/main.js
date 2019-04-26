(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Checkbox"] = factory();
	else
		root["Checkbox"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Checkbox; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class Checkbox
 *
 * 	<div class="js-checkbox" data-condition-class="">
 * 		<button role="checkbox" type="button" aria-checked="false"></button>
 * 		<div style="display: none;">
 *			<input id="option_1" name="option_1" value="false" type="checkbox">
 *		</div>
 *	</div>
 *
 *
 * `
 * @param obj element DOM element.
 * @constructor Checkbox
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */
var Checkbox =
/*#__PURE__*/
function () {
  function Checkbox(element) {
    _classCallCheck(this, Checkbox);

    this.$element = element; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

    this.keyCode = Object.freeze({
      RETURN: 13,
      SPACE: 32
    });
  }

  _createClass(Checkbox, [{
    key: "init",
    value: function init() {
      if (null === this.$element) return false;
      this.$input = this.$element.querySelector('input');

      if (!this.$element.getAttribute('aria-checked')) {
        this.$element.setAttribute('aria-checked', 'false');
      }

      this.isActive = this.$element.getAttribute('aria-checked');
      this.event = new Event('change'); // Condition.

      var conditionClass = this.$element.getAttribute('data-condition-class') || false;
      this.conditionalEls = document.querySelectorAll(".".concat(conditionClass)) || [];
      return this.initEvents();
    }
    /**
     * Trigger event
     *
     * @param  obj element
     * @param  str name Event name
     * @return
     */

  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      // Click.
      this.$element.addEventListener('click', function () {
        Checkbox.triggerEvent(_this.$input, 'change');

        _this.toggle();
      }); // Focus.

      this.$element.addEventListener('focus', function () {
        _this.$element.classList.add('is-focus');
      }); // Keydown.

      this.$element.addEventListener('keydown', function (event) {
        var flag = false;

        switch (event.keyCode) {
          case _this.keyCode.SPACE:
            _this.$input.dispatchEvent(_this.event);

            _this.toggle();

            flag = true;
            break;

          default:
            break;
        }

        if (flag) {
          event.stopPropagation();
          event.preventDefault();
        }
      }); // Blur.

      this.$element.addEventListener('blur', function () {
        _this.$element.classList.remove('is-focus');
      });

      if (this.$input.checked) {
        this.activate();
      }
    }
    /**
     * Checkbox.toggle
     */

  }, {
    key: "toggle",
    value: function toggle() {
      // console.log(this.isActive);
      if ('true' === this.isActive) return this.deactivate();
      return this.activate();
    }
    /**
     * Checkbox.activate
     *
     * @return	bool
     */

  }, {
    key: "activate",
    value: function activate() {
      if ('true' === this.isActive) return false;
      this.isActive = 'true'; //

      this.$element.classList.add('is-selected');
      this.$element.setAttribute('aria-checked', 'true'); // Condition.

      for (var i = 0; i < this.conditionalEls.length; i += 1) {
        this.conditionalEls[i].classList.remove('is-off');
        this.conditionalEls[i].setAttribute('tabIndex', 0);
        this.conditionalEls[i].removeAttribute('disabled');
      } //


      this.$input.value = 'true';
      this.$input.checked = true;
      this.$input.setAttribute('checked', 'true');
      return true;
    }
    /**
     * Checkbox.deactivate
     *
     * @return	bool
     */

  }, {
    key: "deactivate",
    value: function deactivate() {
      if ('false' === !this.isActive) return false;
      this.isActive = 'false'; //

      this.$element.classList.remove('is-selected');
      this.$element.setAttribute('aria-checked', 'false'); // Condition.

      for (var i = 0; i < this.conditionalEls.length; i += 1) {
        this.conditionalEls[i].classList.add('is-off');
        this.conditionalEls[i].setAttribute('tabIndex', -1);
      } //


      this.$input.value = 'false';
      this.$input.checked = false;
      this.$input.removeAttribute('checked');
      return true;
    }
  }], [{
    key: "triggerEvent",
    value: function triggerEvent(element, name) {
      var event = new Event(name);
      return element.dispatchEvent(event);
    }
  }]);

  return Checkbox;
}();



/***/ })

/******/ });
});
//# sourceMappingURL=main.js.map