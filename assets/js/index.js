$(function(){
    getUserInif()
    var layer = layui.layer
   $('#btnLog').on('click',function(){
    layer.confirm('是否要退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index);
      });
   })
    
})

function getUserInif(){
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        headers:{
            Authorization: localStorage.getItem('token') || ''
        },
        success:function(res){
           console.log(res);
                if (res.status !== 0) {
                  return layui.layer.msg('获取用户信息失败！')
                }
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
        }
    })
}

function renderAvatar(user){
    //先获取名字文本
    var name = user.nickname || user.username
    //设置名字
    $('#welcome').html('欢迎 &nbsp;&nbsp;' + name)
    //设置图片
    if(user.user_pic !==null){
       $('.layui-nav-img').attr('src',user.user_pic).show()
       $('.text-avatar').hide() 
    }else {
       
        $('.layui-nav-img').hide() 
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}