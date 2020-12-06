# 自定义事件

- 创建event的方法

```js
let event = new CustomEvent(type, {})
let event = new Event(type)
```

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		
		<input type="text" name="name" id="name" value="" />
		<h1 id="h1"></h1>
		<script type="text/javascript">
			class Module {
				constructor(elTarget, elRender, obj) {
					this.element = document.documentElement;
					this.elTarget = document.querySelector(elTarget);
					this.elRender = document.querySelector(elRender);
					this.obj = obj
				}
				dispatch(type, properies) {
					let event = new Event(type);
					for (let name in properies) {
						event[name] = properies[name];
					}
					this.element.dispatchEvent(event)
				}
				render() {
					this.elRender.innerHTML = this.obj.name
				}
				
				handler() {
					this.element.addEventListener('my-change', (event) => {
						this.obj.name = event.value
					})
					
					this.elTarget.addEventListener('input', (e) => {
						this.dispatch("my-change", {value: e.target.value})
					})
				}
				init() {
					this.handler()
				}
			}
			let module = new Module("#name", "h1", {
				_name: 'zhanghan',
				get name() {
					return this._name
				},
				set name(param) {
					this._name = param
					module.render()
					return this._name
				}
			})
			module.init()  
			
		</script>
	</body>
</html>

```