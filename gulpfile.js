let gulp = require('gulp');
let less = require('gulp-less');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;



let browserSyncPath = ["web/*.html", "web/js/*.js", "web/css/*.css"]; // 监视同步路径  多了./的话增加新文件会没有反应 所以这里取消
let browserSyncRootPath = "web";
let browserSyncIndex = "index.html"; // 服务器启动的时候,默认打开的文件


gulp.task('default', ["browser-sync"], function () {
    console.log("********\n执行了 browser-sync\n********");
});


/**
 * browser-sync
 */
// 静态服务器
gulp.task('server', function () {
    browserSync.init({
        server: browserSyncRootPath
    });
});

// 只根据某个(些)文件更新
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: browserSyncRootPath,
            index: browserSyncIndex
        },
        port: 5000,
        ui: { // ui的默认端口
            port: 5001,
            weinre: { // 不知道什么鬼 "weinre"好像也是用于远程调试的nodejs工具
                port: 5002
            }
        }
    });
    // gulp.watch(browserSyncPath).on("change", reload);
    gulp.watch(browserSyncPath).on("change", function (event) { // 这个就会比上面那个稍微高级点 , 会显示是哪个文件修改了
        gulp.src(event.path).pipe(reload({ stream: true }));
    });
});

// 手动编译less (多文件编译 , 比如 common.less改变 , 全部引用了common.less的文件都会编译)
gulp.task("less", function () {
    gulp.src("web/less/*.less", { base: "web/less/" })
        .pipe(less())
        .pipe(gulp.dest("web/css/"));
});

// 自动编译less (多文件编译 , 比如 common.less改变 , 全部引用了common.less的文件都会编译)
gulp.task("autoLess", function () {
    gulp.watch("web/less/*.less", ['less']) // 后面的任务不要是监视任务,是一次性任务(任务里面没有watch),否则就会出现好多重监视
});

// 自动编译less(单文件编译 , 比如 common.less改变 , 引用了common.less的文件不会被编译)
gulp.task("lessSync", function () {
    browserSync.init({
        server: {
            baseDir: "web",
            index: "index.html"
        },
        port: 5000,
        ui: { // ui的默认端口
            port: 5001,
            weinre: { // 不知道什么鬼 "weinre"好像也是用于远程调试的nodejs工具
                port: 5002
            }
        }
    });

    // 转换less 并刷新 浏览器 , 单less转换 , 怕多less转换会造成多次刷新 , 影响性能
    gulp.watch("web/less/*.less").on('change', function (event) {
        gulp.src(event.path, { base: "web/less/" })
            .pipe(less())
            .pipe(gulp.dest("web/css/"))
            .pipe(reload({ stream: true }));
    });
    gulp.watch(["web/*.html", "web/js/*.js"]).on("change", function (event) { // 这个就会比上面那个稍微高级点 , 会显示是哪个文件修改了
        gulp.src(event.path).pipe(reload({ stream: true }));
    });
});