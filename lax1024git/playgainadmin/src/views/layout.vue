<template>
    <div style="height: 100%;">
        <layout>
            <router-view></router-view>
        </layout>
    </div>
</template>

<script>
    import Layout from "@/components/layout/layout"

    export default {
        components:{
            Layout
        }
    }
</script>