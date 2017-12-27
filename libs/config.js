export const serverConfig = {
    gatewayServer: "https://easy-mock.com/mock/599151aba1d30433d8611d40",
};


//用户状态枚举定义，与服务端保持一致
export const userStatusEnum = {
    UNREGISTERED: 0, // "未注册"
    REGISTERED: 1, // "已注册未开通服务"
    NORMAL: 2, // "服务可正常使用"
    ARREARS: 3, // "暂停服务, //已欠费"
    RETURNING: 4, // "退还卡片处理中"
    SETTLEMENT: 5, // "退卡前已完成结算"
}