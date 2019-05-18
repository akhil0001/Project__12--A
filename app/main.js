//FIXME: Make me Readable

var cl = new Sherlog();
var counter = 0;
var sampleJson = {
    a:1,
    b:2,c:3
};

cl.error(`Heyy I am an error with a stack trace ${new Error('I am inevitable errror')}`);

cl.warn('I am a warning also with a stack trace');
 
cl.log('The value of counter',counter);

cl.info('Also String Interpolation is ','possible','with this library');

cl.debug(sampleJson)//this is an out of box functionality called as silent function. 

cl.success(`fetch API call is successful`);

cl.element('.centered-horizontal')();

function dummy(x,y)
{
   return x+y;
}
cl.monitor(this,dummy);//this experimental function logs the function call with arguments' values
dummy(1,2);
dummy(3,4,5);

var options = {
    isProductionMode: false,
    types: {
        log: {
            label: 'Module1-Log',
            bgColor:'#880E4F'
        },
        success: {
            label: 'Module1-Success',
            bgColor: '#F9A825'
        },
        element: {
            label: 'Selector Element',
            bgColor: '#16a085'
        }
    }
};

//can create any number of loggers with custom configurations
var logger = new Sherlog(options);
var a=1,b=2;

logger.log('HoHoo!! I have new color and new label too!!')

logger.debug({a,b});

logger.setProductionMode(true);

logger.warn('You cannot see me because i am in production mode');

logger.setProductionMode(false);

logger.warn('I am here with new color');

logger.element('p')();

