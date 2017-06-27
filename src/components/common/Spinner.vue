<template>
	<span class="spinner" v-show="visible" :class="className">
		<span class="loader" :style="{width: `${size}px`, height: `${size}px`, borderWidth: `${size/8}px`}"></span>
		<span class="text" :style="{fontSize: `${size/8*7}px`}">{{text}}</span>
	</span>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			visible: {
				type: Boolean,
				default: true
			},
			size: {
				type: Number,
				default: 32
			},
			text: {
				type: String,
				default: '正在加载...'
			},
			className: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style scoped type="text/scss" lang="scss" rel="stylesheet/scss">
	@import "../../assets/css/global";

	.spinner {
		display: inline-block;

		.loader {
			display: inline-block;
			width: $font2XSize;
			height: $font2XSize;
			vertical-align: middle;
			border: 4px solid #ccc;
			border-top-color: $lightGray;
			border-radius: 50%;
			animation: rotate 1.5s linear infinite;
		}

		.text {
			vertical-align: middle;
			color: $lightGray;
			font-size: $fontLSize;
		}
	}

	.spinner-toast {
		.text {
			color: #fff;
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>