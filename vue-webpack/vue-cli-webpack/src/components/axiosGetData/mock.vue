<template>
    <div>
        <ul>
            <li v-for="(val,key) in data">{{key}} -- {{val}}</li>
        </ul>
    </div>
</template>
<script type="text/javascript">
    import Mock from "mockjs";
    export default {
        data() {
            return {
                data: {}
            };
        },
        methods: {
            init() {
                console.clear();
                this.syntax();
                /**
                 * 简单用法
                 * 生成模拟数据
                 * Mock.mock(template)
                 */
                let list = Mock.mock({
                    "list|1-10": [
                        {
                            name: "@name",
                            "id|+1": 1
                        }
                    ]
                });
                console.log(list);

                /**
                 * 拦截ajax请求（只要有执行到代码，就会全局拦截）
                 *
                 * Mock.mock( rurl, template )
                 * Mock.mock( rurl, function( options ) )
                 *
                 *
                 * Mock.mock( rurl, rtype, template )
                 * Mock.mock( rurl, rtype, function( options ) )
                 *
                 */

                //////////
                // 两个参数 //
                //////////
                Mock.mock("/mock/learn1", {
                    title: "被mock拦截 /mock/learn1"
                });
                this.getData({
                    url: "/mock/learn1"
                });

                Mock.mock("/mock/learn2", function(option) {
                    console.log("%c\n请求信息", "font-size:20px;color:red;");
                    console.log(option);
                    return Mock.mock({
                        title: "被mock拦截 /mock/learn2"
                    });
                });
                this.getData({
                    url: "/mock/learn2"
                });

                // 匹配 /mock/all/xxxx
                Mock.mock(/\/mock\/all\/.*/, function(option) {
                    console.log("%c\n请求信息", "font-size:20px;color:red;");
                    console.log(option);

                    return Mock.mock(
                        Object.assign(
                            {
                                title: "被mock拦截 /mock/all/xxxx"
                            },
                            option
                        )
                    );
                });
                this.getData({
                    url: "/mock/all/"
                });
                this.getData({
                    url: "/mock/all/list"
                });
                this.getData({
                    url: "/mock/all/data",
                    method: "post",
                    data: {
                        name: "ccc",
                        age: 18
                    }
                });

                //////////
                // 三个参数 //
                //////////
                Mock.mock(/\/mock\/data\/.*/, "get", {
                    title: "被mock拦截 /mock/data/xxxx",
                    accept: "只接受get请求"
                });

                Mock.mock(/\/mock\/data\/.*/, "post", function(option) {
                    console.log("%c\n请求信息", "font-size:20px;color:red;");
                    console.log(option);

                    let body = JSON.parse(option.body);

                    if (body && body.id) {
                        return Mock.mock(
                            Object.assign(
                                {
                                    title: "被mock拦截 /mock/data/xxxx",
                                    accept: "只接受post请求"
                                },
                                option
                            )
                        );
                    } else {
                        return {
                            msg: "错误，缺少id"
                        };
                    }
                });

                this.getData({
                    url: "/mock/data/list1",
                    method: "get"
                });
                this.getData({
                    url: "/mock/data/list2",
                    method: "post"
                });
                this.getData({
                    url: "/mock/data/list3",
                    method: "post",
                    data: {
                        id: Math.random()
                            .toString()
                            .slice(-6)
                    }
                });
            },

            /**
             */
            syntax() {
                /**
                 * 语法
                 * 属性名   name
                 * 生成规则 rule
                 * 属性值   value
                    'name|rule': value

                 * Mock.Random.占位符()  生成随机 value
                 * @占位符 或者 @占位符(参数[,参数])
                 */

                console.log(Mock.Random.float());
                console.log(Mock.mock('@float'));
                console.log(Mock.mock('@float()'));

                var data = Mock.mock({
                    rule:{
                        "name1|3-10":"a",
                        "name2|3":"a",
                    },
                    basic:{
                    }
                });

                console.log(data);

            },

            /**
             * 请求数据
             */
            getData(obj) {
                this.$axios(obj)
                    .then(res => {
                        if (res && res.data) {
                            console.log(res.data);
                        } else {
                            console.log(res);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        },
        created() {
            this.init();
        }
    };
</script>
