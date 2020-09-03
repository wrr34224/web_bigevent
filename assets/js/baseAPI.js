//注意： 每次调用$.get() $.post() 或$.ajax的时候
//会先调用$.ajaxPrefilter() options请求参数对象
$.ajaxPrefilter(function(options){
    // console.log(options)
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }
    //无论请求或失败都会执行complete这个函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})