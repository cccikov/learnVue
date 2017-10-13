window.onload = function () {
    new Vue({
        el: "#app"
    });
}


Vue.component('tab', {
    template: `
    <div class="tab">
        <div class="tab-nav">
            <a v-for="(val,key) in tab_name" class="tab-nav-btn" :class="{active:(tab_active_num == (key+1))}" href="javascript:void(0)"
                @click=changeView(key+1)>{{val}}</a>
        </div>
        <div class="tab-panel">
            <div v-for="(val,key) in tab_name" class="tab-panel-item" :class="{active:(tab_active_num == (key+1))}" href="javascript:void(0)">
                {{key+1}}
                <slot :name="(key+1)"></slot>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            tab_name: ["标签页1", "标签页2", "标签页3", "标签页4", "标签页5",],
            tab_active_num: 1,
        }
    },
    methods: {
        changeView: function (tabNum) {
            this.tab_active_num = tabNum;
        }
    }
});