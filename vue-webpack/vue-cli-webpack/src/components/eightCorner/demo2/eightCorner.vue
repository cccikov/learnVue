<template>
    <div class="wrap">
        <!-- tar -->
        <div ref="tar" class="eight-corner" :class="{active:box.show}">
            <div class="corner-wrap">
                <span class="corner corner1 top-left" @mousedown="mouseDownHandler(corner1Move,$event)"></span>
                <span class="corner corner2 top-middle" @mousedown="mouseDownHandler(corner2Move,$event)"></span>
                <span class="corner corner3 top-right" @mousedown="mouseDownHandler(corner3Move,$event)"></span>
                <span class="corner corner4 middle-right" @mousedown="mouseDownHandler(corner4Move,$event)"></span>
                <span class="corner corner5 bottom-right" @mousedown="mouseDownHandler(corner5Move,$event)"></span>
                <span class="corner corner6 bottom-middle" @mousedown="mouseDownHandler(corner6Move,$event)"></span>
                <span class="corner corner7 bottom-left" @mousedown="mouseDownHandler(corner7Move,$event)"></span>
                <span class="corner corner8 middle-left" @mousedown="mouseDownHandler(corner8Move,$event)"></span>
            </div>
            <div class="eight-content" @mousedown="mouseDownHandler(contentMove,$event)">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["value","type"],
        data() {
            return {
                animationFrame: {
                    markNum: 0,
                    animationFrameId: null,
                    cancelFlag: false
                },
                box: {
                    width: 120,
                    height: 90,
                    top: 10,
                    left: 10,
                    show: true,
                },
                oldBox: {
                    width: 120,
                    height: 90,
                    top: 10,
                    left: 10,
                    show: true,
                },
                event: {
                    mouseMoveListener: null // 记录当前document mousemove 事件的监听器
                },
                oldPoint: {
                    x: 0,
                    y: 0
                },
                newPoint: {
                    x: 0,
                    y: 0
                },
                limit:{
                    x:0,
                    y:0
                }
            };
        },
        mounted() {
            let _this = this;
            _this.$nextTick(() => {
                _this.refresh();
                document.addEventListener("mouseup", _this.documentMouseUp, false);
            });
        },
        destroyed() {
            document.removeEventListener("mouseup", this.documentMouseUp, false);
        },
        methods: {
            /**
             * 启动帧渲染
             * @return {[type]} [description]
             */
            frameRender() {
                console.log("%c Id:" + this.animationFrame.animationFrameId + " num:" + this.animationFrame.markNum, "font-size:20px;color:blue;");
                this.animationFrame.animationFrameId = window.requestAnimationFrame(() => {
                    this.animationFrame.markNum++;
                    if (this.animationFrame.markNum >= 600) {
                        this.animationFrame.markNum = 0;
                        console.clear();
                    }
                    this.refresh();
                    console.log("%c Id:" + this.animationFrame.animationFrameId + " num:" + this.animationFrame.markNum, "font-size:20px;color:red;");

                    ///////////////////////////
                    // 取消 animationFrame 方式二 //
                    ///////////////////////////
                    if (!this.animationFrame.cancelFlag) {
                        this.frameRender();
                    } else {
                        console.log("%c Id:" + this.animationFrame.animationFrameId, "font-size:20px;color:pink;");
                        this.animationFrame.cancelFlag = false;
                    }
                });

                ///////////////////////////
                // 取消 animationFrame 方式一 //
                ///////////////////////////
                if (this.animationFrame.cancelFlag) {
                    console.log("%c Id:" + this.animationFrame.animationFrameId, "font-size:20px;color:blue;");
                    window.cancelAnimationFrame(this.animationFrame.animationFrameId);
                    this.animationFrame.cancelFlag = false;
                }
            },
            /**
             * 关闭帧渲染
             * @return {[type]} [description]
             */
            cancelFrameRender() {
                console.warn("关闭 requestAnimationFrame");
                console.log("%c Id:" + this.animationFrame.animationFrameId, "font-size:20px;color:#ff5722;");
                if (!this.animationFrame.cancelFlag) {
                    this.animationFrame.cancelFlag = true;
                }
            },
            /**
             * 开始
             */
            startFrameRender() {
                console.warn("启动 requestAnimationFrame");
                this.animationFrame.cancelFlag = false;
                this.frameRender();
            },
            /**
             * 渲染主要内容
             */
            refresh() {
                Object.assign(this.$refs.tar.style, {
                    width: this.box.width + "px",
                    height: this.box.height + "px",
                    transform: "translate3d(" + this.box.left + "px, " + this.box.top + "px, 0)"
                });
            },
            /**
             * 事件handler
             */
            mouseDownHandler(listener, event) {
                event.preventDefault();
                this.startFrameRender();

                this.oldPoint = {
                    x: event.clientX,
                    y: event.clientY
                };

                this.limit = {
                    x:this.box.left+this.box.width,
                    y:this.box.top+this.box.height
                }

                Object.assign(this.oldBox,this.box)

                this.event.mouseMoveListener = listener;
                document.addEventListener("mousemove", listener, false);
            },
            /**
             * document mouseup
             */
            documentMouseUp() {
                this.cancelFrameRender();
                document.removeEventListener("mousemove", this.event.mouseMoveListener, false);
            },
            /**
             * commonMove
             */
            commonMove(event, cb, isLimit = true) {
                event.preventDefault();
                this.newPoint = {
                    x: event.clientX,
                    y: event.clientY
                };

                let delta = {
                    x: this.newPoint.x - this.oldPoint.x,
                    y: this.newPoint.y - this.oldPoint.y
                };


                cb && cb.call(this, delta);

                if(isLimit){
                    this.limitHandler();
                }

                console.log(delta);
            },
            /**
             * 拖拽
             */
            contentMove(event) {
                this.commonMove(event, function(delta) {
                    console.log(delta, this);
                    this.box.top = this.oldBox.top + delta.y;
                    this.box.left = this.oldBox.left + delta.x;
                },false);
            },
            /**
             * limitHandler
             */
            limitHandler(){
                if(this.box.width<30){
                        this.box.width =30;
                    }

                    if(this.box.height<30){
                        this.box.height = 30;
                    }

                    if(this.box.top >this.limit.y-30){
                        this.box.top = this.limit.y-30
                    }

                    if(this.box.left >this.limit.x-30){
                        this.box.left = this.limit.x-30
                    }
            },
            /**
             * corner 1
             */
            corner1Move(event) {
                this.commonMove(event, function(delta) {
                    this.box.width = this.oldBox.width - delta.x;
                    this.box.height = this.oldBox.height - delta.y;
                    this.box.top = this.oldBox.top + delta.y;
                    this.box.left = this.oldBox.left + delta.x;
                });
            },
            /**
             * corner 2
             */
            corner2Move(event) {
                this.commonMove(event, function(delta) {
                    this.box.height = this.oldBox.height - delta.y;
                    this.box.top = this.oldBox.top + delta.y;

                });
            },
            /**
             * corner 3
             */
            corner3Move(event) {
                this.commonMove(event, function(delta) {
                    this.box.width = this.oldBox.width + delta.x;
                    this.box.height = this.oldBox.height - delta.y;
                    this.box.top = this.oldBox.top + delta.y;

                });
            },
            /**
             * corner 4
             */
            corner4Move(event) {
                this.commonMove(event, function(delta) {
                    this.box.width = this.oldBox.width + delta.x;

                });
            },
            /**
             * corner 5
             */
            corner5Move(event) {
                this.commonMove(event, function(delta) {
                    this.box.width = this.oldBox.width + delta.x;
                    this.box.height = this.oldBox.height + delta.y;

                });
            },
            /**
             * corner 6
             */
            corner6Move(event) {
                this.commonMove(event, function(delta) {
                    this.box.height = this.oldBox.height + delta.y;

                });
            },
            /**
             * corner 7
             */
            corner7Move(event) {
                this.commonMove(event, function(delta) {
                    this.box.width = this.oldBox.width - delta.x;
                    this.box.height = this.oldBox.height + delta.y;
                    this.box.left = this.oldBox.left + delta.x;
                });

            },
            /**
             * corner 8
             */
            corner8Move(event) {
                this.commonMove(event, function(delta) {
                    this.box.width = this.oldBox.width - delta.x;
                    this.box.left = this.oldBox.left + delta.x;
                });
            }
        },
        watch: {
            box: {
                handler(val) {
                    console.log(val);
                    console.log(val);
                    console.log(val);
                    console.log(val);
                    this.$emit("input", val);
                },
                deep: true
            },
            value: {
                handler(val) {
                    if (val) {
                        Object.assign(this.box, val);
                        this.$nextTick(() => {
                            this.refresh();
                        })
                    }
                },
                deep: true,
                immediate: true
            }
        }
    };
</script>
<style scoped lang="less">
    .eight-corner {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 150px;
        z-index: 2;
        &.active {
            border: 1px dashed #ccc;

            .corner-wrap {
                .corner {
                    display: block;
                }
            }
        }

        .corner-wrap {
            width: 0px;
            height: 0px;

            .corner {
                display: none;
                position: absolute;
                width: 6px;
                height: 6px;
                padding: 1px;
                border: 1px solid #666;

                &:after {
                    content: "";
                    position: absolute;
                    top: 1px;
                    left: 1px;
                    width: 6px;
                    height: 6px;
                    background: #666;
                }

                &.corner1 {
                    top: 0;
                    left: 0;
                    transform: translate(-50%, -50%);
                    cursor: nwse-resize;
                }

                &.corner2 {
                    top: 0;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    cursor: ns-resize;
                }

                &.corner3 {
                    top: 0;
                    right: 0%;
                    transform: translate(50%, -50%);
                    cursor: nesw-resize;
                }

                &.corner4 {
                    top: 50%;
                    left: 100%;
                    transform: translate(-50%, -50%);
                    cursor: ew-resize;
                }

                &.corner5 {
                    top: 100%;
                    left: 100%;
                    transform: translate(-50%, -50%);
                    cursor: nwse-resize;
                }

                &.corner6 {
                    top: 100%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    cursor: ns-resize;
                }

                &.corner7 {
                    top: 100%;
                    left: 0%;
                    transform: translate(-50%, -50%);
                    cursor: nesw-resize;
                }

                &.corner8 {
                    top: 50%;
                    left: 0%;
                    transform: translate(-50%, -50%);
                    cursor: ew-resize;
                }
            }
        }

        .eight-content {
            width: 100%;
            height: 100%;
            cursor: move;
        }
    }
</style>