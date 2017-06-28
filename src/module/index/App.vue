<template>
	<div class="page">
		<div class="menu-category clearfix">
			<div class="category" id="MenuSlider">
				<ul class="menu-wrapper clearfix" id="Menu">
					<li class="menu-slide" v-for="item in result.category1List">
						<a :href="`product-list.html?category1No=${item.category1No}`">{{item.category1Name}}</a></li>
				</ul>
			</div>
			<a href="category.html" class="more"><span class="iconfont icon-list"></span></a>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import  '../../assets';
	import Toast from '../../components/common/Toast';
	import commonService from '../../services/commonService';

	export default {
		data(){
			return {
				result: {},
				msg   : 'hello world'
			}
		},
		mounted(){
			let loader = Toast.loading();

			commonService.PrdIndex().then((res) => {

				this.result = res.result;

				console.log(res.result);

				loader.close();

				this.$nextTick(() => {

					new Swiper("#MenuSlider", {
						wrapperClass : "menu-wrapper",
						slideClass   : "menu-slide",
						slidesPerView: "auto"
					});

				});

			}).catch((error) => {
				console.log(error);
				loader.close();
			});
		}
	}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">

	@import "../../assets/css/global";

	.menu-category {
		height: 68px;
		background-color: $contentBg;
		.category {
			width: 682px;
			float: left;
			overflow: hidden;
			ul {
				width: 9999px;
				li {
					float: left;
					margin-left: 6px;
					padding: 0 12px;
					a {
						display: block;
						height: 68px;
						line-height: 68px;
						color: #6a6a6a;
					}
					&.current a {
						padding: 0 12px;
						height: 64px;
						color: $primaryColor;
						border-bottom: 4px solid $primaryColor;
					}
				}

			}
		}
		.more {
			float: right;
			width: 68px;
			height: 68px;
			line-height: 68px;
			color: $gray;
			text-align: center;
			box-shadow: 5px 2px 14px 0 rgba(142, 142, 142, 0.93);
		}
	}

</style>