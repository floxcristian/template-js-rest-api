const cron = require('node-cron');

const init = () => {
  cron.schedule('0 */16 * * * *', () => {
    console.log('Se corre cron para el proceso de epysa. ' + new Date());
    // getPedidosEpysa();
  });
};

module.exports.CronLoader = { init };
