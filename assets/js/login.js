$(function () {
    //点击“去注册账号”的链接
    $('#link_reg').on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    //点击“登录”的链接
    $('#link_login').on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    //通过form.verify（）函数自定义校验检测
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义了一叫做pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            //通过形参拿到的是确认密码中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，就return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    });
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post(
            '/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功，请登录！")
                $('#link_login').click()
            }
        )  
    })
    //监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/api/login',
            //快速获取表单中的元素的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //将 服务器 返回的 用户 唯一标识 保存到本地存储
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
    
})