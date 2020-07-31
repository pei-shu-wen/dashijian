$(function () {
    var layer = layui.layer
var form = layui.form
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

            }
        })





    }
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })

    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增文章成功')
                layer.close(indexAdd)

            }
        })
    })
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            type:'get',
            url:'/my/article/cates/'+id,
            success:function(res){
                console.log(res);
               form.val('form-edit',res.data)
            }
        })
    })

   

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类失败')
                }
                initArtCateList()
                layer.msg('更新文章成功')
                layer.close(indexEdit)

            }
        })
    })
    $('tbody').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        layer.confirm('是否要删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type:'get',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    console.log(res);
                    if(res.status!==0){
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    initArtCateList()
                    layer.close(index);
                }
            })
            
          });
    })
})