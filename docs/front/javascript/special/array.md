
# 数组

- 创建一个数组并指定数组的长度为6

  ```javascript
  Araray.length
  
  // 创建一个数组并指定数组的长度为6
  new Array(6)
  Array.of(6)
  ```

- 判断是否是一个数组

  ```javascript
  // 判断是否是一个数组
  Array.isArray()
  ```

- 数组转字符串

  ```javascript
  // 数组转字符串
  [1, 2, 3].toString()
  String([1, 2, 3])
  [1, 2, 3].join(',')
  ```

- 字符串转数组

  ```javascript
  // 字符串转数组
  let str = 'hdcms';
  let str = 'hdcms, zhang';
  console.log(str.split(""))
  console.log(str.split(","))
  console.log(Array.from(str))
  
  let divs = document.querySelectorAll("div")
  Array.from(divs, function(item){
      item.style.backgroundColor = "red";
      return item;
  })
  ```

- 数组合并

  ```javascript
  // 数组合并
  let arr = ['zhang'];
  let arr2 = ['han'];
  
  // 方法一：
  arr.concat(arr2)
  
  // 方法二：
  for(const i = 0; i < arr2.length; i++){
      arr.push(arr2[i])
  }
  
  // 方法三:
  cosnt merageArr = [...arr, ...arr2]
  ```

- 用素组方法遍历操作dom

  ```javascript
  // 用素组方法遍历操作dom
  const div = document.querySelectorAll("div")
  
  // 方法一：
  Array.from(div).map(function(item){
      console.log(item)
  })
  
  // 方法二：
  Array.protorype.map.cal(div, function(item){
      console.log(item)
  })
  
  // 方法三：
  [...div].map(function(item) {
      console.log(item)
  })
  ```

- 创建一个从 n,m 的数组

  ```javascript
  // 创建一个从 n,m 的数组
  function rangeArray(begin, end) {
      const array = [];
      for (let i = begin; i <= end; i++){
          array.push(i);
      }
      return array;
  }
  
  let array = ['zhang', 'han'];
  let vars = array.push('hello');
  let vars = array.pop();
  let vars = array.unshift('hello');
  let vars = array.shift();
  console.log(vars);
  console.log(array)
  ```

- 填充元素

  ```javascript
  // 填充元素
  console.log(Array(5).fill('zhang'))
  console.log([1, 2, 3, 4].fill("zhang", 1, 3))
  ```

- 数组截取

  ```javascript
  // 数组截取
  let arr = [1, 2, 3, 4, 5];
  let hd = arr.splice(0, 3)  
  // 参数第一个是开始位置，第二个是截取的个数，改变元素组，返回新数组值为截取的内容，
  // 第三个参数为截取位置要添加的内容
  // splice 可以实现删除，添加，更新操作
  
  let hd = arr.slice(1, 2);  // 参数是下标 [) 不改变元素组；返回新数组值为截取的内容
  console.log(hd);
  console.log(arr);
  ```

- 移动数组中的内容

  ```javascript
  // 移动数组中的内容
  function moveArray(array, fro, to){
      if (fro < 0 || to >= array.length) {
          throw Error('参数错误')
          return
      }
      const newArray = [...array];
      let item = newArray.splice(fro, 1);
      newArray.splice(to, 0, ...item);
      return newArray;
  }
  ```

- 清空数组

  ```javascript
  // 清空数组
  let hd = [1,2,3,4,5];
  let arr = hd;
  hd = []  // 元素组不改变 只是改变指针指向另一个空数组
  hd.length = 0  // 改变元素组
  hd.splice(0, hd.length)
  while(hd.pop()){}
  ```

- 数组的拆分与合并

  ```javascript
  // 数组的拆分与合并
  let str = "zhang,han"
  let hd = str.split(',');  // 把字符串拆分成数组
  let hd = hd.join('-'); // 把数组合并成字符串
  ```

- 数组复制

  ```javascript
  // 数组复制
  let hd = [1,2,3,4,5,6];
  
  // copyWithin 第一个参数是开始复制的位置，第二三个参数是复制的内容位置 [)
  console.log(hd.copyWithin(3, 1,3))
  ```

- 数组查找

  ```javascript
  // 数组查找
  let arr = [1,2,3,4];
  // indexOf 查到了返回下标，查不到反回-1
  // lastIndexOf 从右向左找
  console.log(arr.indexOf(2))
  // indexOf 第二个参数是查找的起始点
  console.log(arr.indexOf(2, 0))
  console.log(arr.lastIndexOf(2))
  // includes 返回布尔值，有是true 没有是false
  consoe.log(arr.includes(2))
  ```

- 遍历查找

  ```javascript
  // 遍历查找
  let arr = [1,2,3,4];
  // find 遍历数组如果返回值为真则返回遍历时的那一项
  let res = arr.find(function(item) {
      return item === 2
      // return true
  })
  // findIndex 遍历数组如果返回值为真则返回遍历时的那一项的下标
  let res = arr.find(function(item) {
      return item === 2
      // return true
  })
  
  let lessons = [{name: 'js'},{name: 'css'},{name:'python'}]
  let status = lessons.find(function(item) {
      return item.name === 'css'
  })
  console.log(status)
  ```

- 排序

  ```javascript
  // 排序
  let arr = [1,2,3,4];
  arr = arr.sort(function(a, b){
      // -1 从小到大  1 整数从大到小
      return a-b;
  })
  
  let cart = [
      {name: "iphone", price: 12000},
      {name: "imac", price: 18000},
      {name: "ipad", price: 3200},
  ]
  ```

- 值类型与引用类型遍历

  ```javascript
  // 值类型与应用类型遍历
  let cart = [
      {name: "iphone", price: 12000},
      {name: "imac", price: 18000},
      {name: "ipad", price: 3200},
  ]
  
  for( const value of cart) {
      value.name = 'zhanghan'
  }
  console.table(cart)
  
  let arr = [1,2,3,4];
  for(let value of arr){
      value +=10;
  }
  console.log(arr)
  ```

- forEach

  ```javascript
  // forEach
  let arr = [1,2,3,4];
  arr.forEach(function(item,index, th){
      item = 10
  })
  console.log(arr)
  // forEach 可以直接遍历dom元素
  let list = document.querySelectorAll('ul li');
  list.forEach(function(item) {
      item.addEventListener('click', function(){
          this.calssList.toggle('disable')
      })
  })
  
  let arr = ["zhang", "han"]
  console.log(arr.keys())
  console.log(arr.values())
  console.log(arr.entries().next())
  ```

- every 与 some filter  map

  ```javascript
  // every 遍历一个数组接受一个回调函数 
  // 每次回调函数都返回true则返回true否则返回false (全都为真返回真)
  
  // some 遍历一个数组接受一个回调函数 
  // 回调函数有一个返回true则返回true否则返回false (有一个为真返回真)
  
  // 过滤 filter 遍历一个数组接受一个回调函数 回调函数返回true则 则返回该遍历项
  
  // map 数组映射 遍历一个数组接受一个回调函数 返回一个数组，
  // 数组中的每一项就是回调函数的返回值，改不改变元素组还得看元素组中的每一项是值类型还是引用类型
  //（可以理解为复制，在复制的过程中可以修改）
  let cart = [
      {name: "iphone", price: 200},
      {name: "imac", price: 200},
      {name: "ipad", price: 3200},
  ]
  const er = cart.filter(function(price) {
      return price.price === 200
  })
  console.log(er)
  
  ```

- reduce

  ```javascript
  // reduce
  let arr = [1,2,3,1,1]
  
  arr.reduce(function(pre, value, index,array) {
      console.log(pre, value, index,array)
  })
  arr.reduce(function(pre, value, index,array) {
      console.log(pre, value, index,array)
  }, 0)
  ```

- 统计次数 测试

  ```javascript
  // 统计次数 测试
  function arrayCount(array, item){
      return array.reduce(function(total, cur){
          total += item == cur ? 1 : 0;
          return total
      }, 0)
  }
  console.log(arrayCount(arr,1))
  ```

- 获取数组的最大值

  ```javascript
  // 获取数组的最大值
  let arr = [1,2,4,5,3,4];
  function arrayMax(array) {
      return array.reduce(function(pre, cur){
          return pre > cur ? pre : cur;
      })
  }
  console.log(arrayMax(arr));
  ```

- 练习

  ```javascript
  // 获取商品价格最高的商品
  let cart = [
      {name: "iphone", price: 12000},
      {name: "imac", price: 18000},
      {name: "ipad", price: 3200},
  ]
  function maxPrice(goods) {
      return cart.reduce(function(pre, cur) {
          return pre.price > cur.price ? pre : cur;
      });
  }
  console.log(maxPrice(cart))
  
  // 商品价格汇总
  function sum (goods) {
      return goods.reduce(function(total, cur) {
          return (total += cur['price'])
      }, 0);
  }
  console.log(sum(cart))
  
  // 获取价格超过1万元商品的名称
  function getNameByPrice (goods, price) {
      return goods.reduce(function(arr, cur) {
          if(cur.price > price)
              arr.push(cur)
          return arr;
      }, []).map(item => item.name)
  }
  console.table(getNameByPrice(cart, 10000))
  
  // 数组去重
  let arr = [1,3,4,5,3,4]
  let newArr = arr.reduce(function(arr, cur){
      if(!arr.includes(cur))
          arr.push(cur);
      return arr
  }, [])
  console.log(newArr(arr))
  
  // 去除重复商品
  let cart = [
      {name: "iphone", price: 12000},
      {name: "imac", price: 18000},
      {name: "ipad", price: 3200},
      {name: "ipad", price: 3200}
  ]
  
  function filterGoods(goods) {
      return goods.reduce(function(arr, cur) {
          let find = arr.find(function(v) {
              return v.name == cur.name;
          })
          if(!find) arr.push(cur);
          return arr;
      }, [])
  }
  console.table(filterGoods(cart));
  ```

  
