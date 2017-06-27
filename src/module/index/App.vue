<template>
	<div class="page">
		{{msg}}
	</div>
</template>

<script type="text/ecmascript-6">
	import  '../../assets';
	import Toast from '../../components/common/Toast';
	import commonService from '../../services/commonService';

	export default {
		data(){
			return {
				msg: 'hello world'
			}
		},
		mounted(){
			let loader = Toast.loading();

			commonService.PrdIndex().then((res) => {
				console.log(res.result);
				loader.close();
			}).catch((error) => {
				console.log(error);
				loader.close();
			});
		}
	}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">


</style>