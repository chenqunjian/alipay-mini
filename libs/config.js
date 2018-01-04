export const serverConfig = {
    gatewayServer: "http://changantong.i-xiaoma.cn:8080/mini-program-gateway/mini",
    // gatewayServer: "http://192.168.0.107/mini-program-geteway/mini",
    // gatewayServer: "http://changantong.i-xiaoma.cn/mini-program-geteway/mini",
};

export const getCardUrl = "https://memberprod.alipay.com/account/openform/activecard.htm?app_id=2017122601245171&template_id=20171227000000000719164000300116&__webview_options__=canPullDown%3dNO%26transparentTitle%3dauto"

//用户状态枚举定义，与服务端保持一致
// export const cardStatus = {
//     UNREGISTERED: 0, // "未注册"
//     REGISTERED: 1, // "已注册未开通服务"
//     NORMAL: 2, // "服务可正常使用"
//     ARREARS: 3, // "暂停服务, //已欠费"
//     RETURNING: 4, // "退还卡片处理中"
//     SETTLEMENT: 5, // "退卡前已完成结算"
// }