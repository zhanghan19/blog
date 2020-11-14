<template>
	<div class="my-wrapper">
		<img class="my-img" @click="openImages" :src="url" alt="">
	</div>
</template>

<script>
	//import mediumZoom from 'medium-zoom'
export default {
	methods: {
		openImages() {
			// 获取 mediumZoom 实例
			const zoom = this.$vuepress.mediumZoom.instance;
			// 调用实例方法
			zoom.open();
		}
	},
	props:['url']
};
</script>

<style></style>
