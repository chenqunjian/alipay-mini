require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../..//pages/introduce/introduce');
require('../..//pages/index/index');
require('../..//pages/agreement/agreement');
require('../..//pages/register/register');
require('../..//pages/qrcode/qrcode');
require('../..//pages/payResult/payResult');
require('../..//pages/pay/pay');
require('../..//pages/payRecord/payRecord');
require('../..//pages/payRecordDetail/payRecordDetail');
require('../..//pages/line/line');
require('../..//pages/help/help');
require('../..//pages/account/account');
require('../..//pages/busRecord/busRecord');
require('../..//pages/returnCard/returnCard');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
