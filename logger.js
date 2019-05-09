(function (console) {

    //TODO: add line support to out of box functions
    //TODO: add timestamp support 
    //TODO: JSDOC Extension
    //TODO: check the browser compatability and ... spread operator
    //TODO: add font-color for the options


    /**
     * Constructor to create a new log object
     * @param {obect} options the JSON which has the log level configurations 
     */
    function Log(options) {

        /**
         * helper function that merges the object B and objectA
         * @param {object} src 
         * @param {object} target 
         */
        var _extend = function (src, target) {
            var keysofsrc = Object.keys(src);
            for (var i = 0; i < keysofsrc.length; i++) {
                if (src.hasOwnProperty(keysofsrc[i])) {
                    target[keysofsrc[i]] = src[keysofsrc[i]];
                }
            }
            return target;
        };

        /**
         * A private method that initializes the console methods according to the options provided
         * @param {object} options 
         */
        var _init = function (options) {
            if (options.hasOwnProperty('types')) {
                var types = Object.keys(options.types);
                //iterating through each type and creating their respective functions

                for (var i = 0; i < types.length; i++) {
                    _createFunction(types[i], options.types[types[i]], this);
                }
            } else {
                return false;
            }
        };

        //These are default options that are considered for the log object
        var _options = {
            types: {
                success: {
                    bgColor: '#27ae60',
                    label: 'Success'
                },
                info: {
                    bgColor: '#1E88E5',
                    label: 'Info'
                },
                debug: {
                    bgColor: '#647687',
                    label: 'Debug'
                },
                warn: {
                    bgColor: '#e67e22',
                    label: 'Warning'
                },
                error: {
                    bgColor: '#e74c3c',
                    label: 'Error'
                },
                element: {
                    bgColor: '#8e44ad',
                    label: 'HTMLElement'
                }

            }
        };

        //As of now this function is in very raw format , any contributions and developments are welcome
        /**
         * Creates function based on the types given in options
         * @param {string} type
         * @param {object} option
         * @return {object} 
         */
        var _createFunction = function (type, option, self) {
            switch (type) {
                case 'error':
                    self.error = logError(option);
                    break;
                case 'warn':
                    self.warn = logWarn(option);
                    break;
                case 'info':
                    self.info = logInfo(option);
                    break;
                case 'success':
                    self.success = logSuccess(option);
                    break;
                case 'element':
                    self.element = logElement.bind(this, option);
                    break;
                default:
                    self.debug = logDebug(option);
                    break;
            }
        }

        /**
         * This function prints all the element  with the given selector
         * @param {object} opt 
         * @param {string} selector 
         */
        var logElement = function (opt, selector) {
            var allElements = document.querySelectorAll(selector);
            var context = "%c" + opt.label + ":"
            if (allElements.length > 0)
                //currying has been applied for preserving the line number
                return console.log.bind(console, context + "%c There are %s elements selected by '%s'\n%o", "background-color:#8e44ad;color:#ffffff;padding:2px;border-radius:0px", "", allElements.length, selector, ...allElements);
            else
                return console.log.bind(console, context + "%c There are %s elements selected by '%s'", "background-color:#8e44ad;color:#ffffff;padding:2px;border-radius:0px", "", allElements.length, selector);
        }

        var logError = function (opt) {
            var context = "%c" + opt.label + ":";
            //bind and call has been used for avoiding currying and preserving the line numbers
            return Function.prototype.bind.call(console.error, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        };

        var logWarn = function (opt) {
            var context = "%c" + opt.label + ":";
            return Function.prototype.bind.call(console.warn, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        };

        var logInfo = function (opt) {
            var context = "%c" + opt.label + ":";
            return Function.prototype.bind.call(console.info, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        };

        var logSuccess = function (opt) {
            var context = "%c" + opt.label + ":";
            return Function.prototype.bind.call(console.log, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        };

        var logDebug = function (opt) {
            var context = "%c" + opt.label + ":";
            return Function.prototype.bind.call(console.log, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        };


        //As of the version options is not yet considered. Default options are taken up
        if (options)
            _options.types = _extend(options.types, _options.types);
        _init.bind(this, _options)();




    }
    window.Log = Log;

})(window.console);