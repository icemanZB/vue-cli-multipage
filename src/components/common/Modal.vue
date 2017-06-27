<template>
	<transition-group name="modal" tag="div">
		<div key="mask" v-show="visible" class="modal-mask"></div>
		<div key="wrap" v-show="visible" class="modal-wrap" flex="main:center cross:center">
			<div class="modal-content" :class="className">
				<div class="modal-header" flex="cross:center">
					<div>
						<div class="modal-title">{{title}}</div>
						<div class="modal-body">
							<slot>
								<div>{{content}}</div>
							</slot>
						</div>
					</div>
				</div>
				<div class="modal-footer" flex="dir:left box:mean">
					<div v-for="btn in buttons">
						<a href="javascript:;" @click="btnClick(btn)" :class="btn.className" :style="btn.style">{{btn.text}}</a>
					</div>
				</div>
			</div>
		</div>
	</transition-group>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';

	let Modal = {
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '提示'
			},
			content: String,
			className: {
				type: String,
				default: ''
			},
			buttons: {
				type: Array,
				default: ()=>[
					{
						text: '确认',
						onClick: () => {
						},
						className: '',
						style: {}
					}
				]
			}
		},
		methods: {
			btnClick(btn) {
				btn.onClick && btn.onClick.call(this);
			}
		}
	};

	const show = (options = {}) => {
		const {title = '提示', content, className = '', buttons = []} = options;

		const ModalConstructor = Vue.extend(Modal);
		let modal = new ModalConstructor({
			el: document.createElement('div'),
			methods: {
				...Modal.methods,
				btnClick(btn) {
					let returnValue;
					btn.onClick && (returnValue = btn.onClick.call(this));
					if (returnValue !== false) {
						this.close();
					}
				},
				close() {
					this.visible = false;
					this.$el.addEventListener('transitionend', () => {
						this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
					});
				}
			}
		});

		Object.assign(modal, {
			visible: false,
			title,
			content,
			className,
			buttons
		});

		document.body.appendChild(modal.$el);

		modal.$nextTick(()=>{
			modal.visible = true;
		});

		return modal;
	};

	const alert = (content, title) => {
		return new Promise(function(resolve) {
			show({
				title,
				content,
				buttons: [
					{text: '确认', className: 'confirm', onClick: ()=>resolve(true)}
				]
			});
		});
	};

	const confirm = (content, title) => {
		return new Promise(function(resolve) {
			show({
				title,
				content,
				buttons: [
					{text: '取消', onClick: ()=>resolve(false)},
					{text: '确认', className: 'confirm', onClick: ()=>resolve(true)}
				]
			});
		});
	};

	Object.assign(Modal, {
		show,
		alert,
		confirm
	});

	export default Modal;

</script>

<style scoped type="text/scss" lang="scss" rel="stylesheet/scss">
	@import "../../assets/css/global";

	.modal-mask, .modal-wrap {
		min-width: 100%;
		min-height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: $zIndexPopup;
	}

	.modal-wrap {
		overflow: auto;
		background-color: transparent;
		-webkit-overflow-scrolling: touch;
	}

	.modal-enter, .modal-leave-active {
		&.modal-mask {
			opacity: 0;
		}
		&.modal-wrap {
			opacity: 0;
			transform: scale3d(0.5, 0.5, 0.5);
		}
	}

	.modal-enter-active, .modal-leave-active {
		&.modal-mask {
			transition: opacity 0.2s linear;
		}
		&.modal-wrap {
			transition: opacity 0.2s linear, transform 0.2s linear;
		}
	}

	.modal-header {
		min-height: 5em;
		> div {
			width: 100%;
		}
	}

	.modal-title {
		font-size: $fontXSize;
		margin: $fontLSize 0;
		padding: 0 1em;
		&.no-content {
			font-size: $fontLSize;
			margin: $fontLSize*2 0;
		}
	}

	.modal-body {
		margin: $font2XSize 0;
		padding: 0 1em;
	}

	.modal-content {
		width: 70%;
		max-width: $pageWidth;
		border-radius: 0.5em;
		font-size: $fontLSize;
		position: relative;
		background-color: #fff;
		border: 0;
		background-clip: padding-box;
		text-align: center;
		overflow: hidden;
	}

	.modal-footer {
		border-top: 1px solid #ddd;
		font-size: $fontXSize;

		a {
			display: block;
			padding: $fontSSize;
			border-left: 1px solid #ddd;
			color: $gray;
		}
		>div:first-child a {
			border-left: 0;
		}
		.confirm {
			color: $secondaryColor;
		}
	}
</style>