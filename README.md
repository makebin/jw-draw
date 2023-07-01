```html
<template>
	<view class="container">
		<view class="certificate-box" id="certificate-box">
			<view class="draw">
				<jw-draw :background="backgroundSrc" @afterInitialize="afterInitialize"></jw-draw>
			</view>
		</view>
	</view>
</template>
<script>
	import jwDraw from 'jw-draw';
	import backgroundSrc from '@/static/img/x2.jpg';
	import TextUnit from 'jw-draw/src/tools/TextUnit.js';
	export default {
		components: {
			jwDraw
		},
		data() {
			return {
				backgroundSrc,
			}
		},
		methods: {
			async afterInitialize({
				canvas,
				imageSize,
				canvasW,
				canvasH
			}) {
				//写一串文字
				const text = new TextUnit({
					text: '亲爱的张三丰',
					fontSize: 28,
					color: '#000000',
					x: 57 * 2,
					y: 186 * 2,
					width: canvasW - 220,
					ellipsis: false
				});
				text.draw(canvas);				
			}
		}
	}
</script>

<style>

</style>

<style lang="scss">
	.certificate-box {
		background-repeat: no-repeat;
		background-size: 100% auto;
		min-height: 100vh;
		background-color: #FFFFFF;
	}

	.draw {
		transform: scale(0.6);
	}
</style>

```