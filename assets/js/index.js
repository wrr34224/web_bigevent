$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            layer.close(index);
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        });
    })
})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }

    })

}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()//隐藏文字头像
    } else {
        $('.layui-nav-img').hide()//隐藏图像头像
        var first = name[0].toUpperCase()//获取用户名 的第一个首字母并设置大写
        $('.text-avatar').html(first).show()
    }

}