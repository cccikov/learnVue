<template>
    <div>
        <p>page1</p>
        <p v-for="val in ranInt(10,20)">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor repellat inventore error porro earum enim. Delectus, provident eum ab necessitatibus id mollitia eos? Ea dolorum repudiandae minus! Voluptatum, officia nemo!</p>
        <p>
            <a href="javascript:void(0)" @click="$router.push({'name':'page2'})">to page2</a>
        </p>
    </div>
</template>
<script>
    export default {
        methods: {
            ranInt(max, min) {
                if (min > max) {
                    var mid = max;
                    max = min;
                    min = mid;
                }
                return parseInt(Math.random() * (max - min + 1) + min);
            }
        }
    };
</script>