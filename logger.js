//conventions: _ (underscore) is used as a prefix to indicate that it is private
(function (console) {

    //TODO: add line support to out of box functions --recurring
    //FIXME: Refactoring the code 
    //TODO: add the prefix to the options so that user can specify which module he is logging from 
    //TODO: Add Charts support
    //TODO: add random quotes as log.random() function --next time
    //TODO: Debug functionality is not so intuitive
    //TODO: add font-color for the options



    /**
     * Constructor to create a new log object
     * @param {obect} options the JSON which has the log level configurations 
     */
    function Sherlog(options) {

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
        }

        /**
         * flag for toggling the logging statements into console
         * If production mode is true, then statements will not be logged
         */
        var isProductionMode = false;

        //These are default options that are considered for the log object
        var _options = {
            prefix: 'global',
            isProductionMode: false,
            types: {
                success: {
                    bgColor: '#0e8a16',
                    label: 'Success'
                },
                info: {
                    bgColor: '#1E88E5',
                    label: 'Info'
                },
                log: {
                    bgColor: '#5319e7',
                    label: 'Log'
                },
                warn: {
                    bgColor: '#e67e22',
                    label: 'Warning'
                },
                error: {
                    bgColor: '#ee0701',
                    label: 'Error'
                },
                element: {
                    bgColor: '#cc317c',
                    label: 'HTMLElement'
                },
                monitor: {
                    bgColor: '#e4405f',
                    label: 'Monitor'
                },
                debug: {

                }
            }
        };



        /**
         * setProduction mode is a public method to toggle the log statements
         * @param {boolean} flag 
         */
        var setProductionMode = function (flag) {
            isProductionMode = this.isProductionMode = flag;
            options && (options.isProductionMode = flag);
            _init.bind(this, _options)();
        }
        //exposing the method to the user
        this.setProductionMode = setProductionMode;

        var logError = function (opt) {
            var context = `%c${opt.label}:`;
            //bind and call has been used for avoiding currying and preserving the line numbers
            return Function.prototype.bind.call(console.error, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        };

        var logWarn = function (opt) {
            var context = `%c${opt.label}:`;
            return Function.prototype.bind.call(console.warn, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        };

        var logInfo = function (opt) {
            var context = `%c${opt.label}:`;
            return Function.prototype.bind.call(console.info, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        };

        var logSuccess = function (opt) {
            var context = `%c${opt.label}:`;
            return Function.prototype.bind.call(console.log, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        };

        var logDebug = function (opt) {
            return Function.prototype.bind.call(console.table, console);
        };

        var logLog = function (opt) {
            var context = `%c${opt.label}:`;
            return Function.prototype.bind.call(console.log, console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;border-radius:0px");
        }

        /**
         * logEmpty is a function that does nothing and will be used for production mode
         */
        var logEmpty = function () {
            //production mode is turned on. Use setProductionMode(false) to turn on logging
        };

        var logEmptyCurry = function () {
            return logEmpty.bind(this);
        }

        //The following functions are out of box and experimental --happy hacking
        /**
         * This function prints all the element  with the given selector
         * @param {object} opt 
         * @param {string} selector 
         */
        //FIXME: Major changes to preserve line number introducing the stackTrace function
        var logElement = function (opt, selector) {
            var allElements = document.querySelectorAll(selector);
            var context = `%c${opt.label}:%c There are ${allElements.length} elements selected by '${selector}' `;
            allElements.length && (context = context + '\n%o');
            if (allElements.length > 0)
                //currying has been applied for preserving the line number
                return console.log.bind(console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;", "", ...allElements);
            else
                return console.log.bind(console, context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;", "");
        };

        var logMonitor = function (opt, self, functionName) {
            //FIXME: Refactor the code
            var temp = functionName;
            self[functionName.name] = function () {
                // startTime = performance.now(); -->next version needs rework
                temp(...arguments);
                // endTime = performance.now();
                // var timeDiff = (endTime-startTime)*1000;
                context = `%c${opt.label}:%c ${functionName.name} is called with arguments %o`;
                console.log(context, "background-color:" + opt.bgColor + ";color:#ffffff;padding:2px;", "", ...arguments);
            };
        };

        /**
         * Creates function based on the types given in options
         * @param {string} type
         * @param {object} option
         * @return {object} 
         */
        var _createFunction = function (type, option, self) {
            switch (type) {
                case 'error':
                    //if isProuctionMode is true,then log nothing 
                    self.error = isProductionMode ? logEmpty : logError(option);
                    break;
                case 'warn':
                    self.warn = isProductionMode ? logEmpty : logWarn(option);
                    break;
                case 'info':
                    self.info = isProductionMode ? logEmpty : logInfo(option);
                    break;
                case 'success':
                    self.success = isProductionMode ? logEmpty : logSuccess(option);
                    break;
                case 'element':
                    self.element = isProductionMode ? logEmptyCurry : logElement.bind(this, option);
                    break;
                case 'monitor':
                    //still experimental
                    self.monitor = isProductionMode ? logEmptyCurry : logMonitor.bind(this, option);
                    break;
                case 'log':
                    self.log = isProductionMode ? logEmpty : logLog(option);
                    break;
                default:
                    self.debug = isProductionMode ? logEmpty : logDebug(option);
                    break;
            }
        }

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
        if (options) {
            _options.types = _extend(options.types, _options.types);
            isProductionMode = this.isProductionMode = _options.isProductionMode || options.isProductionMode;
        }
        _init.bind(this, _options)();

    }
    window.Sherlog = Sherlog;

})(window.console);