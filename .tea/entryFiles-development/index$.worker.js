require('./config$');

function success() {
require('../..//app');
require('../..//pages/index/index');
require('../..//pages/line/line');
require('../..//pages/qrcode/qrcode');
require('../..//pages/introduce/introduce');
require('../..//pages/openCardEnd/openCardEnd');
require('../..//pages/help/help');
require('../..//pages/agreement/agreement');
require('../..//pages/register/register');
require('../..//pages/payResult/payResult');
require('../..//pages/pay/pay');
require('../..//pages/busRecord/busRecord');
require('../..//pages/payRecord/payRecord');
require('../..//pages/payRecordDetail/payRecordDetail');
require('../..//pages/account/account');
require('../..//pages/errorPage/errorPage');
require('../..//pages/returnCard/returnCard');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
