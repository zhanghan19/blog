# 实现一个toy-borwser

## 流程
<mermaid>
graph LR
  id1["URL"]
  id2("HTML")
  id3(("DOM"))
  id4("DOM with CSS")
  id5["DOM with position"]
  id6("Bitmap")
  id1 --HTTP--> id2
  id2 --parse--> id3
  id3 --css computing--> id4
  id4 --layout--> id5
  id5 --render--> id6
</mermaid>