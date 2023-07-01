/*
 * @Author: ※mk9007@163.com
 * @Date: 2021-02-03 10:19:25
 * @LastEditTime: 2021-02-04 22:50:35
 * @2021-02-03 10:19:25
 * @Route: 
 * @FilePath: \uniapp_house\components\m-painter\canvas\textPanel.js
 * @Description: 
 * @Copyright 2021
 * @U2FsdGVkX1+ZIXU/AIJgzXNmur/kcio4wZG9DMOSf+wY3GM1S6sbp4TSbCUUC2xXHYERfgUJvuVIjCHTYsH+z9FLdxCn34dmQFGj6e6rBUiCfLqp7JRkVD+XT3AcLmHj6O3WD2ZlsHMBd3Hacgtu/nxKflgOyZtb7y2X3vgYirLr+gCTiQ8GJRw9CMXhpkRq5MsOqTenZGlGeZk7f/3vA9JUwmC/qJKdeh0UmuOUr0uy4V6NKVBjYf69n+gIY6SQ
 * @◆●○★☆
 */

const defaultConfig = {
	fontSize: 28, //字体大小
	color: '#333333', //字体颜色
	text: "", //要显示的文本内容
	x: 0, //文字起始坐标X
	y: 0, //文字起始坐标Y
	width: 150,
	rowSpacing: 20,
	lineHeight: 0,
	lineType: true
}
wx.getSystemInfo({
	success: function (res) {
		defaultConfig.lineHeight = res.fontSizeSetting * 1.9;
	}
});
/**
 * 文本绘制
 */
class TextUnit {
	/**
	 * 
	 * @param {*} config  配置信息
	 * @param {*} ctx 画笔
	 */
	constructor(config) {
		this.config = Object.assign(defaultConfig, config);
		this._canvas;
	}

	/**
	 * 绘制文字
	 */
	draw(canvas) {
		this._canvas = canvas;
		let self = this;

		this._canvas.setFontSize(this.config.fontSize);
		this._canvas.setFillStyle(this.config.color);

		const arrText = this.config.text.split('');
		var line = '';
		var y = this.config.y;
		for (var n = 0; n < arrText.length; n++) {
			var testLine = line + arrText[n];
			var metrics = this._canvas.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > this.config.width && n > 0) {
				this._canvas.fillText(line, this.config.x, y);
				line = arrText[n];
				y += this.config.lineHeight;
			} else {
				line = testLine;
			}
		}
		this._canvas.fillText(line, this.config.x, y);
	}






}

export default TextUnit;