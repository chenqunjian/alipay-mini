const baseCdn = 'https://xm-cdn.oss-cn-hangzhou.aliyuncs.com/img/traffic_card'

App({
  onLaunch(){
    //客户编号
    let userCode = ''

    let data = my.getStorageSync({key: 'user_info'})
    if(data.data){
           
      this.globalData.userInfo = data.data.user_info
      console.log(this.globalData.userInfo)
      // my.alert({content: this.globalData.userInfo.cardNo});
      // my.alert({content: this.globalData.userInfo.customerNo});
    }
  },
  globalData: {
    userInfo: {
      customerNo: '',
      cardNo: ''
    },
    balance: 0,   //余额,
    cardReturning: false, //正在退卡中,
    appId: '2017122601245171',
    cardName: '长安通电子公交卡',
    cardImage: `${baseCdn}/changantong_card.png`,
    cardDescList: [
      {header: '先充值、后使用', footer: ''}
    ],
    menuList: [
      {label: '余额查询', path: 'account', icon: `${baseCdn}/balance_icon.png`},
      {label: '卡片充值', path: 'pay', icon: `${baseCdn}/recharge_icon.png`},
      {label: '乘车记录', path: 'busRecord', icon: `${baseCdn}/trafficLog_icon.png`},
      {label: '开通线路', path: 'line', icon: `${baseCdn}/openLine_icon.png`},
      {label: '使用帮助', path: 'help', icon: `${baseCdn}/help_icon.png`},
      {label: '退卡申请', path: 'returnCard', icon: `${baseCdn}/cardClose_icon.png`}
    ],
    rechargeTipImage: `${baseCdn}/recharge_list_body_tip.png`,
    rechargeList: [
      {label: '10元', value: 10},
      {label: '20元', value: 20},
      {label: '30元', value: 30},
      {label: '40元', value: 40},
      {label: '50元', value: 50}
    ],
    rechargeProtocol: [
      '尊敬的客户，为保障您的合法权益，请您在点击“立即充值”按钮前，完整、仔细地阅读本充值协议。当您继续点击“立即充值”按钮，即视为您已阅读、理解本协议，并同意按本协议规定执行。',
      '1、本电子卡开通后需进行充值方可使用，本充值仅限市民对长安通电子卡充值；',
      '2、本账户金额仅可用于西安市实际开通的西安公交乘车刷码服务；',
      '3、充值次数不设限制，账户余额上限1000元；',
      '4、充值后，账户余额使用不设有效期，不能转移、转赠；您获取的长安通电子卡仅供您本人使用，因您不合理使用所造成的一切资金损失责任将由您自行承担；',
      '5、您可以在支付宝内长安通电子卡详情发起退卡申请，退卡申请提交后，7个工作日内待系统审核完用户账单后完成退款，如享受的优惠交易发生退款，仅退还用户实际交易发生的金额（不包含折扣优惠金额），已享优惠资格不再补偿；',
      '6、如您发生手机遗失等情况应及时修改登陆密码，修改密码前发生的损失需由本人自行承担；',
      '7、本协议内容未尽事宜由双方协商解决，最终解释权归西安城市一卡通有限责任公司所有。如果您对本协议的条款有任何疑问，请拨打客户服务电话(96123)进行询问。反馈时间：周一至周五，9:00-17:00。'
    ],
    day: 7,
    helpData: {
      onTitleTap: 'handleTitleTap',
      panels: [
        {
          question: '什么是长安通电子卡?',
          answer: '长安通电子卡是长安通、小码联城和支付宝共同推出的线上电子公交卡，乘客可在支付宝内领取“长安通电子卡”，并提前充值（最低起充10元），乘车时只要打开支付宝的长安通电子卡公交刷码页面，即可刷码乘公交。',
        },
        {
          question: '如何领取？',
          answer: '打开支付宝-搜索“长安通电子卡”-按照其步骤领取长安通电子卡',
        },
        {
          question: '领卡后如何使用？',
          answer: '使用时，打开支付宝-搜索“长安通电子卡”-按照其步骤领取长安通电子卡',
        },
        {
          question: '“长安通电子卡”是如何收费的？乘车票价是多少？',
          answer: '“长安通电子卡”领取电子公交卡免费，采用先储值后乘车的乘车方式，乘车按照常规车费收取; “长安通电子卡”先开通的线路仅为试点线路，目前每次刷码按常规票价（投币票价）进行扣款；',
        },
        {
          question: '是否有乘车优惠？是否有换乘优惠？',
          answer: '相关优惠暂时未开通，尽请期待。',
        },
        {
          question: '如何查看乘车记录？',
          answer: '您可通过支付宝搜索-“长安通电子卡”-进入卡片详情-乘车记录，查询乘车信息',
        },
        {
          question: '哪些线路可以使用支付宝乘车？其他线路什么时候可以上线？',
          answer: '您可通过支付宝搜索-长安通电子卡-卡片详情-开通线路，查询已开通乘车刷码功能的公交线路其他线路的乘车刷码功能在逐步开通中',
        },
        // {
        //   question: '还有哪些城市可以使用支付宝乘车？',
        //   answer: '您可通过支付宝内【乘车码】-【切换卡片】-【领取新卡】来查看现有开通公交卡（及乘车码）业务的城市',
        // },
        {
          question: '可以充值长安通实体公交卡么？',
          answer: '暂不支持实体卡充值；',
        },
        {
          question: '为什么无法领取“长安通电子卡”',
          answer: '（1）您在领卡时，同一用户只能领取一张公交卡，若该账号无法领取，请查看是否有其他支付宝账号领取“长安通电子卡”（2）您在领卡认证时，是否输错验证信息；（3）如上述问题不存在仍不可领卡，请在支付宝内发起咨询或支付宝客服电话：95188进行咨询',
        },
        {
          question: '上车时不小心多刷了好几遍，扣款如何退回？',
          answer: '若您在乘车时对刷码金额有疑问，均可在支付宝内发起客服咨询，待客服审核该笔交易无误后，多余费用将会在7个工作日内返还到您账户。',
        },
        {
          question: '使用乘车刷码刷码机没反应怎么办？',
          answer: '（1）手机乘车码未对准刷码窗口，可稍微调整对准方向或距离（2）若您依然无法刷码，可能是因为机具问题或您的乘车码有问题，若是机具问题，请告知公交司机帮助；若是您乘车码有问题，可在支付宝内发起咨询或支付宝客服电话：95188进行咨询',
        },
        {
          question: '可以使用长安通电子卡帮朋友刷码么？',
          answer: '根据有关规定，目前乘车码仅限本人使用。',
        },
        {
          question: '不想用了，如何退卡？',
          answer: '若用户不想使用线上公交卡后，乘车时不使用“长安通电子卡”即可，该卡不会产生任何额外扣费情况。若用户希望直接退卡，则需通过支付宝搜素-长安通电子卡-进入卡面详情-发起退卡申请即可，我们会在7个工作日内审核并退款退卡。',
        }
      ]
    },
    lineList:[
      // {
      //   name: '907',
      //   start: '纺织城火车站',
      //   end: '新合',
      // },
      // {
      //   name: 'X101',
      //   start: '昆明路·富源二路口',
      //   end: '阿房宫高铁站',
      // },
      // {
      //   name: 'X102',
      //   start: '劳动路',
      //   end: '公园南路北口',
      // },
      // {
      //   name: '26路',
      //   start: '梨园路和生国际',
      //   end: '翠华路植物园',
      // },
      // {
      //   name: '270路',
      //   start: '城南客运站',
      //   end: '纺织城枢纽站',
      // },
      {
        name: '907路',
        start: '神鹿坊',
        end: '新合乡政府',
      },
      {
        name: '611路',
        start: '汉城路',
        end: '火车站',
      },
      {
        name: '11路',
        start: '林河春天枢纽站',
        end: '南门',
      },
      {
        name: '45路',
        start: '延兴南门',
        end: '大庆路桃园路口',
      },
      {
        name: '609路',
        start: '红旗西路枢纽站',
        end: '唐城墙九区枢纽站',
      },
      {
        name: '7路',
        start: '王家坟',
        end: '西门',
      },
      {
        name: '500路区间',
        start: '培华学院',
        end: '火车站',
      },
      {
        name: '5路',
        start: '南三环电子正街枢纽站',
        end: '火车站',
      },
      {
        name: '环2线路',
        start: '辛家庙公交枢纽站',
        end: '辛家庙公交枢纽站',
      }
    ]
  }
});
