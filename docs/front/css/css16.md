# 16. 动画

## Animation

- @keyframes定义
- animation: 使用

```css
@keyframes mykf{
	from {background: red;}
	to {background: yellow;}
}
div{
	animation:mykf 5s infinite;
}
```
- animation-name 时间曲线
- animation-duration 动画的时长；
- animation-timing-function 动画的时间曲线；
- animation-delay 动画开始前的延迟；
- animation-iteration-count 动画的播放次数；
- animation-direction 动画的方向。

```css
@keyframes mykf {
	0% { top: 0; transition:top ease}
	50% { top: 30px;transition:top ease-in }
	75% { top: 10px;transition:top ease-out }
	100% { top: 0; transition:top linear}
}

```
## Transition

- transition 使用
- transition-property 要变换的属性；
- transition-duration 变换的时长；
- transition-timing-function 时间曲线；
- transition-delay 延迟。

## [cubic-bezier](https://cubic-bezier.com/#.17,.67,.83,.67)

![cubic-bezier](/images/bezier1.png)
![cubic-bezier](/images/bezier2.png)