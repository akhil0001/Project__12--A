
var log =new Log();

 var msg = "I love you 3000";

log.error(msg);

log.warn(msg);

log.debug(msg);

log.info(msg);

log.success(msg);

log.element('.element')();

var options = {
    types:{
        error:{
            label: 'Module1-Fatal',
            bgColor: '#b71c1c'
        },
        success:{
            label: 'Module1-Success',
            bgColor:'#F9A825'
        },
        element:{
            label: 'Selector Element',
            bgColor: '#4E342E'
        }
    }
};

//can create any number of loggers with custom configurations
var logger = new Log(options);

logger.error(msg);

logger.success(msg);

logger.element('.container')();
logger.debug([1,2,'hai']);

var logElement = log.element('div');

logElement();