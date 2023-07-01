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

let defaultConfig = {
	fontSize: 28, //字体大小
	color: '#333333', //字体颜色
	text: "", //要显示的文本内容
	x: 0, //文字起始坐标X
	y: 0, //文字起始坐标Y
	width: 150,
	rowSpacing: 20,
	lineType: true
}

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
		console.log(this.config);
		this._canvas;
		//当前画笔位置记录
		this.current = {};
	}


	getResult() {
		return this.current;
	}

	/**
	 * 绘制文字
	 */
	draw(canvas) {
		this._canvas = canvas;
		let self = this;
		/**
		 * 
		 * @param {*} text  剩余文本内容
		 * @param {*} ellipsis  省略字段
		 */
		let getEllipsisLine = function(text = "", ellipsis = '...') {
			let _ellipsisWidth = 0;
			for (let a of ellipsis) {
				_ellipsisWidth += self._canvas.measureText(a).width;
			}
			if (_ellipsisWidth >= self.config.width) {
				return {
					text: ellipsis,
					w: _ellipsisWidth
				};
			}
			let _text = '';
			for (let a of text) {
				_ellipsisWidth += self._canvas.measureText(a).width;
				if (_ellipsisWidth >= self.config.width) {
					break;
				}
				_text += a;
			}
			return {
				text: `${_text}${ellipsis}`,
				w: _ellipsisWidth
			}
		}

		/**
		 * 记录当前画笔位置
		 * @param {*} current 
		 */
		let saveCurrent = function(current) {
			self.current = Object.assign(self.current, current);
		}

		this._canvas.setFontSize(this.config.fontSize);
		this._canvas.setFillStyle(this.config.color);
		//当前处理到的第几个字
		let _strLastIndex = 0;
		let _strHeight = this.config.y
		let _num = 1;
		let _strlineW = 0;
		let text = this.config.text;
		for (let i = 0; i < text.length; i++) {
			_strlineW += this._canvas.measureText(text[i]).width;
			//如果输出区域小于字符串总长度
			if (_strlineW > this.config.width) {
				//如果第二行，并且使用....省略的处理方式
				if (_num == 2 && this.config.LineType) {
					//文字换行数量大于二进行省略号处理
					let _ellipsis = getEllipsisLine(text.substring(_strLastIndex), '....');
					this._canvas.fillText(
						_ellipsis.text,
						this.config.x,
						_strHeight
					);
					saveCurrent({
						y: _strHeight,
						x: this.config.x + _ellipsis.w,
						num: _num
					});
					_strlineW = 0;
					_strLastIndex = i;
					_num++;
					break;
				} else {
					//打印一第二
					this._canvas.fillText(
						text.substring(_strLastIndex, i),
						this.config.x,
						_strHeight
					);
					//记录当前画笔位置
					saveCurrent({
						y: _strHeight,
						x: _strlineW,
						num: _num
					});
					_strlineW = 0;
					_strHeight += this.config.rowSpacing;
					_strLastIndex = i;
					_num++;
				}
				//如果计算字符长最后一个字符的长度还是小于输出区域宽度，直接进行打印
			} else if (i == text.length - 1) {
				this._canvas.fillText(
					text.substring(_strLastIndex, i + 1),
					this.config.x,
					_strHeight
				);
				saveCurrent({
					x: _strlineW,
					y: _strHeight,
					num: 1
				})
				_strlineW = 0;
			}
		}
	}






}

export default TextUnit;