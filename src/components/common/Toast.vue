<template>
	<transition name="toast">
		<div class="toast-cover" v-show="visible">
			<div class="toast" :class="className">
				<spinner v-if="spinner" :text="message" className="spinner-toast"></spinner>
				<span v-else>{{message}}</span>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';
	import Spinner from './Spinner';

	let Toast = {
		props: {
			visible: {
				type: Boolean,
				default: true
			},
			message: String,
			className: {
				type: String,
				default: ''
			},
			spinner: {
				type: Boolean,
				default: false
			}
		},
		components: {
			Spinner
		}
	};

	const show = (options = {}) => {
		options = typeof options === 'string' ? {message: options} : options;
		const {message, className = '', spinner = false, duration = 2000} = options;

		const ToastConstructor = Vue.extend(Toast);
		let toast = new ToastConstructor({
			el: document.createElement('div'),
			methods: {
				close() {
					this.visible = false;
					this.$el.addEventListener('transitionend', () => {
						this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
					});
				}
			}
		});

		Object.assign(toast, {
			visible: false,
			message,
			className,
			spinner
		});

		document.body.appendChild(toast.$el);

		toast.$nextTick(()=>{
			toast.visible = true;
			duration > 0 && setTimeout(()=>toast.close(), duration);
		});

		return toast;
	};

	const text = message => {
		return show(message);
	};

	const loading = message => {
		return show({message, spinner: true, duration: 0});
	};

	Object.assign(Toast, {
		show,
		text,
		loading
	});

	export default Toast;

	//Toast.text('操作成功');
	//var loader = Toast.loading();
	//setTimeout(()=>loader.close(), 3000);

</script>

<style scoped type="text/scss" lang="scss" rel="stylesheet/scss">
	@import "../../assets/css/global";

	.toast-cover {
		min-width: 100%;
		min-height: 100%;
		background: rgba(0, 0, 0, 0.01);
		position: fixed;
		left: 0; top: 0; right: 0; bottom: 0;
		z-index: $zIndexPopup;
	}
	.toast {
		max-width: 80%;
		border-radius: 10px;
		padding: 15px;
		background: rgba(0, 0, 0, 0.7);
		color: #fff;
		box-sizing: border-box;
		text-align: center;
		z-index: 1000;
		position: fixed;
		left: 50%; top: 50%;
		transform: translate(-50%, -50%);
	}
	.toast-enter, .toast-leave-active {
		opacity: 0;
	}
	.toast-enter-active, .toast-leave-active {
		transition: opacity 0.35s linear;
	}
</style>