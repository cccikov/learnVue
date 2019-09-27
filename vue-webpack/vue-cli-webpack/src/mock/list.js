import Mock from 'mockjs'

/**
 * 只要有执行，就会拦截ajax请求
 */
Mock.mock('/mock/api/list', 'post', {
    "data|5-10": [{
        "name": "@cname 测试",
        'num|3': '1',
        "style": "@clast 式",
        "space": "@clast 空间",
        "area": "@integer(11, 99)",
        "time": "@date(yyyy-MM-dd)",
        "money": '@integer(1001, 9999)',
        "image": "@image(200x200)",
        "introduction|6-10": "@string"
    }]
})
