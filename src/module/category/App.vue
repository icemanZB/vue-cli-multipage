<template>
	<div class="page" id="Category">


		<ul class="category clearfix">
			<li v-for="item in CATEGORY">
				<a :href="`product-list.html?category1No=${item.category1No}`">
					<h3>{{item.alt}}</h3>
				</a>
			</li>

		</ul>

	</div>
</template>

<script type="text/ecmascript-6">
	import Toast from '../../components/common/Toast';
	import { CATEGORY } from '../../constants/enum';

	export default  {
		data() {
			return {
				CATEGORY
			}
		},
		mounted(){

		},
		methods   : {

		}
	}
</script>

<style scoped type="text/scss" lang="scss" rel="stylesheet/scss">

	@import "../../assets/css/global";

	.category {
		background-color: $contentBg;
		height: 100%;
		li {
			float: left;
			padding: 34px 0 0 24px;
			width: 218px;
			text-align: center;
			img {
				height: 218px;
				display: block;
				margin: 0 auto;
			}

			h3 {
				padding-top: 30px;
				font-size: 30px;
				color: $gray;
			}
		}
	}
</style>