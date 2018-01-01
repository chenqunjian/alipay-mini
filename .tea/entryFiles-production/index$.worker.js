require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../..//pages/index/index');
require('../..//pages/line/line');
require('../..//pages/pay/pay');
require('../..//pages/introduce/introduce');
require('../..//pages/help/help');
require('../..//pages/agreement/agreement');
require('../..//pages/register/register');
require('../..//pages/qrcode/qrcode');
require('../..//pages/payResult/payResult');
require('../..//pages/payResult/payResult');
require('../..//pages/payRecord/payRecord');
require('../..//pages/payRecordDetail/payRecordDetail');
require('../..//pages/account/account');
require('../..//pages/busRecord/busRecord');
require('../..//pages/returnCard/returnCard');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
