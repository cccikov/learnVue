<script>
    export default {
        render(createElement) {
            /* 每次渲染都会触发 */
            // console.log(this);
            let h = createElement;
            return h(
                "div",
                {
                    class: "wrap"
                },
                [
                    "<p>123123</p>",
                    h("p", "<p>123123</p>"),
                    h(
                        "div",
                        {
                            class: "major"
                        },
                        [
                            checkboxAll.call(this, h, "checkAll", "checkAllChange"),
                            this.list.map(val => {
                                return checkbox.call(this, h, val.name, val.value, "checkList");
                            })
                        ]
                    )
                ]
            );
        },
        data() {
            return {
                checkList: [],
                checkAll: false,
                list: [
                    {
                        name: "ccc",
                        value: "123"
                    },
                    {
                        name: "name1",
                        value: "5234"
                    },
                    {
                        name: "name2",
                        value: "8567"
                    },
                    {
                        name: "name3",
                        value: "03485"
                    }
                ]
            };
        },
        methods: {
            checkAllChange() {
                if (this.checkAll) {
                    this.checkList = this.list.map(val => {
                        return val.value;
                    });
                } else {
                    this.checkList = [];
                }
            }
        },
        watch: {
            checkList(val) {
                if (val.length == this.list.length) {
                    this.checkAll = true;
                } else {
                    this.checkAll = false;
                }
            }
        }
    };

    function checkboxAll(h, property, changeEvent) {
        var vm = this;
        return h("label", [
            h("input", {
                attrs: {
                    type: "checkbox"
                },
                domProps: {
                    value: "all",
                    checked: vm[property]
                },
                on: {
                    change(e) {
                        vm[property] = !vm[property];
                        vm[changeEvent](e);
                    }
                }
            }),
            h("span", "全选")
        ]);
    }

    function checkbox(h, name, value, property) {
        var vm = this;
        var checked = vm[property].includes(value);
        return h("label", [
            h("input", {
                attrs: {
                    type: "checkbox"
                },
                domProps: {
                    value: value,
                    checked
                },
                on: {
                    change(e) {
                        var _this = e.currentTarget;
                        var list = vm[property];
                        if (_this.checked) {
                            if (!list.includes(_this.value)) {
                                list.push(_this.value);
                            }
                        } else {
                            let index = list.indexOf(_this.value);
                            if (index != -1) {
                                list.splice(index, 1);
                            }
                        }
                        console.log(list);
                    }
                }
            }),
            h("span", name)
        ]);
    }
</script>


<style lang='less'>
    label {
        display: block;
        line-height: 2;
    }
</style>
