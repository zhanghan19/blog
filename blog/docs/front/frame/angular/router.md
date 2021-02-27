# 路由
## 流程
- **创建路由模块**

	设计路由表

	导出路由
- **在根模块中导入路由**
- **路由的使用**
	声明导航链接或js控制导航
	
	

## 路由表设计
## 路由传参
### 声明式路由
- 查询字符串（get）

跳转
```html
<a [routerLink]="[ '/progress']" [queryParams]="{name: 'zhang'}">进程管理</a>
```
接收

```ts
import { ActivatedRoute } from '@angular/router';
constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      console.log(data)
    })
  }
```
- 动态路由

配置路由参数

```ts
  const routes: Routes = [
    { path: 'progress/:id', component: ContentComponent },
  ];
```

跳转
```html
   <a [routerLink]="[ '/progress', 1 ]">进程管理</a>
```
### js控制路由

- 动态传参

```ts
import { Router } from '@angular/router';

constructor(private router: Router) { }

goHome() {
    this.router.navigate(['/progress', 3])
}
```

- 查询字符串（get）

```ts
import { NavigationExtras, Router } from '@angular/router';

constructor(private router: Router) { }

goHome() {
    let navigationExtras: NavigationExtras = {
	  queryParams: {'session_id': 123}
	}
	this.router.navigate(['/progress', 3], navigationExtras)
}
```
