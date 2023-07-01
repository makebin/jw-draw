<template>
	<view class="jw-draw">
		<canvas :canvas-id="id" :style="{ width: canvasW + 'px', height: canvasH + 'px' }"></canvas>
	</view>
</template>

<script>
	import TextUnit from './tools/TextUnit.js';
	import seal2x from '@/static/img/seal2x.png';
	console.log('seal2x', seal2x);
	export default {
		name: "jw-draw",
		props: {
			id: {
				type: String,
				default: `JwDraw-${~~(new Date())}`
			},
			background: {
				type: [Object, String],
				default: () => {
					return '';
				}
			}
		},
		data() {
			return {
				canvasW: 0,
				canvasH: 0,
				_canvas: null,
			};
		},
		methods: {
			error(title) {
				uni.showToast({
					title,
					icon: 'none'
				})
			},
			// 把px像素转换成vh单位
			px2vh(pxValue) {
				let _pxValue = parseInt(pxValue);
				if (!isNaN(_pxValue)) {
					return _pxValue;
				}
				let matchValues = pxValue.match(/\d+/g);
				return matchValues[0] || 0;
			},
			//画布初始化
			async canvasInitialize() {
				const cxt = this;
				this._canvas = uni.createCanvasContext(this.id, this);
				const backgroundInfo = await this.imageSize(this.background);
				// 画布大小
				console.log(backgroundInfo);
				if (backgroundInfo.errMsg !== "getImageInfo:ok") {
					this.error(backgroundInfo.errMsg);
				}
				this.canvasW = backgroundInfo.width;
				this.canvasH = backgroundInfo.height;
				this._canvas.setFillStyle(this.background.color || '#ffffff');
				this._canvas.fillRect(0, 0, this.canvasW, this.canvasH);
				this._canvas.drawImage(this.background, 0, 0, this.canvasW, this.canvasH);


				this.$nextTick(function() {
					this.$emit('afterInitialize', {
						canvas: cxt._canvas,
						imageSize: this.imageSize,
						canvasW: this.canvasW,
						canvasH: this.canvasH

					})
				})

				setTimeout(() => {
					cxt._canvas.draw(true, (ret) => {
						cxt.donwloadFile();
					})
				}, 600);
			},

			//获取图片基础信息
			async imageSize(src) {
				return new Promise((resolve, errs) => {
					uni.getImageInfo({
						src: src,
						success: function(image) {
							resolve(image);
						},
						fail(err) {
							console.error(err);
							errs(err);
						},
					});
				});
			},
			//转换画布图片到临时文件中
			donwloadFile() {
				const cxt = this;
				uni.canvasToTempFilePath({
						canvasId: this.id,
						quality: 1,
						success: (res) => {
							console.log('canvasToTempFilePath success', res);

							cxt.$emit("download", res);
						},
						fail: function(res) {
							console.log('canvasToTempFilePath fail', res);
							cxt.$emit("downloadFail", res);
						},
						complete: function() {},
					},
					cxt
				);
			},
		},
		mounted() {
			this.canvasInitialize();
		}
	}
</script>

<style>
</style>