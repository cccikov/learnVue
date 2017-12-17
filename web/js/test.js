var vm = new Vue({
    el: "#wrap",
    data: {
        sort_data: {
            pjInfoList: [],
            index_count: 6
        }
    },
    methods: {
        getMenu: function (cb) {
            //加载菜单树
            ztree = $.fn.zTree.init($("#menuTree"), setting, testData.menuList); // 生成菜单tree
            cb && cb();
        },
        menuTree: function (sortid) {
            layer.open({ // 打开弹窗
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择项目",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#menuLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) { // 点击确认按钮是
                    var node = ztree.getSelectedNodes(); // 获取你选择的项
                    vm.del(sortid); // 先将之前的删除
                    vm.sort_data.pjInfoList.push({
                        id: node[0].id,
                        name: node[0].name,
                        sort: sortid
                    });
                    layer.close(index);
                }
            });
        },
        select: function (sortid) {
            vm.getMenu(function () {
                vm.menuTree(sortid);
            });

        },
        del: function (sortid) {
            vm.sort_data.pjInfoList.forEach(function (key, index, arr) {
                if (key.sort == sortid) {
                    arr.splice(index, 1);
                }
            });
        }
    },
    computed: {
        realData: function () { // 对sort_data进行处理

            var json = this.sort_data;

            // 新数据
            var data = {
                pjInfoList: [],
                index_count: json.index_count
            };
            var len = data.index_count;

            // 创建空数据
            for (var i = 0; i < len; i++) {
                data.pjInfoList.push({});
            }

            // 将数据按照sort的值放在数组中对应的位置(sort从1开始)
            json.pjInfoList.forEach(function (key, index) {
                var _index = key.sort;
                if (_index != null && _index != "") {
                    data.pjInfoList.splice(_index - 1, 1, key); // sort从1开始
                }
            });

            return data;
        }
    }
});

// menuTree 配置
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "menuId", // id
            pIdKey: "parentId", // 级别
            rootPId: -1 // 根部级别
        },
        key: {
            url: "nourl"
        }
    }
};














// 测试数据
var testData = {
    "menuList": [{
        "icon": "fa fa-cog",
        "list": null,
        "menuId": 1,
        "name": "系统管理",
        "open": null,
        "orderNum": 0,
        "parentId": -1,
        "parentName": null,
        "perms": null,
        "type": 0,
        "id": 123,
        "url": null
    }, {
        "icon": "fa fa-file-text-o",
        "list": null,
        "menuId": 29,
        "name": "系统日志",
        "open": null,
        "orderNum": 7,
        "parentId": -1,
        "parentName": null,
        "perms": "sys:log:list",
        "type": 1,
        "id": 124,
        "url": "sys/log.html"
    }, {
        "icon": null,
        "list": null,
        "menuId": 0,
        "name": "一级菜单",
        "open": true,
        "orderNum": null,
        "parentId": -1,
        "id": 125,
        "parentName": null,
        "perms": null,
        "type": null,
        "url": null
    }],
    "code": 0
}