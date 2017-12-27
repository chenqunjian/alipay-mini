
const {globalData} = getApp();
Page({
    data: {},

    onShow(){
        console.log('introduce show')

    },

    register(event){
        console.log({event})
        my.redirectTo({
            url: '/pages/register/register',
        });
    },


});
