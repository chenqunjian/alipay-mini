require('./config$');

function success() {
require('../..//app');
require('../..//pages/register/register');
require('../..//pages/index/index');
require('../..//pages/payResult/payResult');
require('../..//pages/introduce/introduce');
require('../..//pages/qrcode/qrcode');
require('../..//pages/line/line');
require('../..//pages/help/help');
require('../..//pages/account/account');
require('../..//pages/busRecord/busRecord');
require('../..//pages/returnCard/returnCard');
require('../..//pages/pay/pay');
require('../..//pages/payRecord/payRecord');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
