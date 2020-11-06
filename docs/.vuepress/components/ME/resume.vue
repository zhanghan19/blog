<template>
	<div id="content" ref="content">
		<div class="post" ref="post">
			<!-- <p>你好，欢迎来到我的博客</p> -->
			<div class="avater clearFix">
				<img :src="BasicInfo.avater" alt="" class="imgs1" />
				<div class="pro">
					<p class="name">{{ BasicInfo.name }}</p>
					<p class="zhiye">{{ BasicInfo.position }}</p>

					<p class="art_pic">
						<a :href="BasicInfo.article.href">{{ BasicInfo.article.num }}</a>
						<a :href="BasicInfo.photo.href">{{ BasicInfo.photo.num }}</a>
					</p>
					<p>
						<span>文章</span>
						<span>相册</span>
					</p>
					<p class="zhiye1" @click="slidDown"><img src="/images/resume/dow.png" alt="" /></p>
				</div>
			</div>
		</div>
		<!-- 个人信息 -->
		<div class="personal">
			<div class="hea">
				<div class="hea_con">
					<span class="frist_w"><img src="/images/resume/a.jpg" alt="" /></span>
					<span class="w">bout</span>
					<p>个人信息</p>
				</div>
			</div>
			<div class="msg">
				<p>
					<b>姓名：</b>
					<span>{{ PersonalData.name }}</span>
				</p>
				<p>
					<b>性别：</b>
					<span>{{ PersonalData.sex }}</span>
				</p>
				<p>
					<b>年龄：</b>
					<span>{{ PersonalData.age }}</span>
				</p>
				<p>
					<b>籍贯：</b>
					<span>{{ PersonalData.address }}</span>
				</p>
				<p>
					<b>电话：</b>
					<span>{{ PersonalData.tel }}</span>
				</p>
				<p>
					<b>邮箱：</b>
					<span>{{ PersonalData.Email }}</span>
				</p>
			</div>
		</div>
		
		<!-- 求职意向 -->
		<div class="personal qz">
			<div class="hea">
				<div class="hea_con">
					<span class="frist_w"><img src="/images/resume/j.jpg" alt="" /></span>
					<span class="w">ob</span>
					<p>求职意向</p>
				</div>
			</div>
			<div class="msg">
				<p>
					<b>目标职位：</b>
					<span>{{ JobIntention.TargetPosition }}</span>
				</p>
				<p>
					<b>到岗时间：</b>
					<span>{{ JobIntention.PostTime }}</span>
				</p>
				<p>
					<b>工作性质：</b>
					<span>{{ JobIntention.NatureOfWork }}</span>
				</p>
				<p>
					<b>现居城市：</b>
					<span>{{ JobIntention.NowCities }}</span>
				</p>
				<p>
					<b>目标城市：</b>
					<span>{{ JobIntention.TargetCities }}</span>
				</p>
				<p>
					<b>期望薪资：</b>
					<span>{{ JobIntention.ExpectSalary }}</span>
				</p>
			</div>
			<div class="introduce">
				<img src="/images/resume/xiajia.png" alt="" />
				<div class="education">
					<!-- 学历及介绍 -->
					<a target="_blank" href="https://www.chsi.com.cn/xlcx/bg.do?vcode=AQV1YH2ZDWZTRS6H&trnd=24511940667138567314737058278133&srcid=archive">学历及介绍</a>
				</div>
				<div class="left">
					<div class="time">{{ EducationalBackground.time }}</div>
					<div class="edc_bg">
						<p class="scholl">
							<span>学校：</span>
							<span>{{ EducationalBackground.school }}</span>
						</p>
						<p>
							<span>学历：</span>
							<span>{{ EducationalBackground.education }}</span>
						</p>
						<p>
							<span>专业：</span>
							<span>{{ EducationalBackground.professional }}</span>
						</p>
					</div>
				</div>
				<div class="right">{{ EducationalBackground.introduce }}</div>

				<div class="language clearFix" v-for="(item, i) in EducationalBackground.language">
					<div class="lan_item">
						<p class="tit">{{ item.title }}</p>
						<div class="progress_bar"><div :style="{ width: item.degree }" class="progress_bar_on"></div></div>
						<span class="degree">熟练度 {{ item.degree }}</span>
					</div>
					<div class="lan_item">
						<p class="tit">听说</p>
						<div class="progress_bar"><div :style="{ width: item.ls_degree }" class="progress_bar_on"></div></div>
						<span class="degree">熟练度 {{ item.ls_degree }}</span>
					</div>
					<div class="lan_item">
						<p class="tit">读写</p>
						<div class="progress_bar"><div :style="{ width: item.rw_degree }" class="progress_bar_on"></div></div>
						<span class="degree">熟练度 {{ item.rw_degree }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 工作经验 -->
		<div class="personal">
			<div class="hea">
				<div class="hea_con">
					<span class="frist_w"><img src="/images/resume/e.jpg" alt="" /></span>
					<span class="w">xperience</span>
					<p>工作经验</p>
				</div>
			</div>

			<div class="e_msg">
				<!-- 圆 -->
				<div class="e_item active" v-for="(item, i) in experience" :key="i">
					<div :class="[i > 0 ? 'up_line' : '', 'w_circle']">
						<div class="n_circle"></div>
						<div class="befor_company">
							<h3>
								{{ item.company }}
								<span>（{{ item.post }}）</span>
							</h3>
							<span>地址：{{ item.trade }}</span>
							<br />
							<span>时间：{{ item.time }}</span>
							<p>
								<span>工作内容：</span>
								{{ item.JobDuties }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 技能介绍 -->
		<div class="personal">
			<div class="hea">
				<div class="hea_con">
					<span class="frist_w"><img src="/images/resume/s.jpg" alt="" /></span>
					<span class="w">kills</span>
					<p>技能介绍</p>
				</div>
			</div>
			<div class="msg skills">
				<!-- <div v-for="(item, index) in skills" :key="index">
					<h3>{{ item.title }}</h3>
					<div class="pro-item">
						
						<p v-for="(e, i) in item.children" :key="i">
							
							<a :href="e.link">{{ e.name }}</a>
							<span>{{ e.desc }}</span>
						</p>
						
					</div>
				</div> -->
				
				<div>
					<h3>前端</h3>
					<div class="pro-item">
						<p>
							<a href="/front/html/">HTML：</a>
							<span>对语义化标签有一定的了解。熟练使用 
							<a href="">html</a> 
							的语法完成项目布局。了解相关标准。</span>
						</p>
						<p>
							<a href="/front/css/">CSS：</a>
							<span>
								<!-- <a href="/front/css/css4.html#找出-w3c-标准中的-css-属性">了解相关标准。</a> -->
								熟练使用选择器及语法完成页面样式修改。
								了解排版过程（正常流和Flex）了解
								<a href="/front/css/css16.html#animation">动画</a> 
								<a href="">颜色</a> 
								<a href="">绘制</a>
							</span>
						</p>
						<p>
							<a href="/front/javascript/">Javascript：</a>
							<span>熟练使用 javascript (包含ES6-11)语法进行数据操作，结合DOM 、CSSOM 及 浏览器 API 完成页面交互</span>
						</p>
						<p>
							<a href="#">HTTP：</a>
							<span>
								了解http协议（请求/响应 行，请求/响应头，请求/响应体）
							</span>
						</p>
						<p>
							<a href="/front/browser/">浏览器：</a>
							<span>了解大概的浏览器工作过程</span>
						</p>
						<p>
							<a href="#">用过的框架、库、及ui：</a>
							<span> uni-app 、 Vue、Axios 、layer 、Jquery 、bootstrap、Element-ui 、layui......</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 项目经验 -->
		<div class="personal">
			<div class="hea">
				<div class="hea_con">
					<span class="frist_w"><img src="/images/resume/p.jpg" alt="" /></span>
					<span class="w">rojects</span>
					<p>项目经验</p>
				</div>
			</div>
			<div class="msg projects">
				<div v-for="(item, index) in projects">
					<h3>{{ item.title }}</h3>
					<div class="pro-item" v-for="(e, i) in item.children">
						<p>
							<b>项目名称：</b>
							<span>{{ e.name }}</span>
						</p>
						<p>
							<b>详情：</b>
							<span v-for="(res, inx) in e.info" :key="inx">
								<a class="pro-info" :href="res.link">{{ res.desc }}</a>
							</span>
						</p>
						<p>
							<b>项目周期：</b>
							<span>{{ e.time }}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
// import {Timeline, Animation} from '../public/js/animation.js'
// let tl = new Timeline()
// tl.add(new Animation({set a(v) {console.log(v)}}, "a", 0, 100, 1000, null))
// tl.start()
export default {
	data() {
		return {
			BasicInfo: {
				name: '张寒',
				position: 'Web前端',
				avater: '/images/resume/avater.jpg',
				article: {
					num: 20,
					href: '#'
				},
				photo: {
					num: 90,
					href: '#'
				}
			},
			PersonalData: {
				name: '张寒',
				WorkExperience: '2年',
				sex: '男',
				age: '1993年11月23',
				tel: '13305185974',
				address: '江苏',
				Email: 'zhanhan321@126.com'
			},
			JobIntention: {
				PostTime: '随时可',
				NatureOfWork: '',
				HopeIndustries: '',
				NowCities: '南京',
				TargetCities: '',
				ExpectSalary: '',
				TargetPosition: '前端'
			},
			EducationalBackground: {
				school: '南京财经大学',
				education: '本科',
				professional: '食品安全与品控',
				time: '2013-2017',
				introduce: '',
				language: [
					{
						title: '英语',
						degree: '65%',
						ls_degree: '60%',
						rw_degree: '70%'
					}
				]
			},
			experience: [
				{
					company: '南京诺博连',
					post: 'web前端',
					trade: '南京珠江大厦',
					time: '2017年4月-2018年1月',
					JobDuties: '以学习前端技术使用html + css + javascript书写页面并完成交互'
				},
				{
					company: '众远科技',
					post: 'web前端',
					trade: '南京双子塔',
					time: '2018年4月-2020年8月',
					JobDuties:
						'1. 需求沟通 2. 针对产品需求制定开发计划并实现需求。3. 收集用户反馈，整理用户反馈，根据反馈内容，制定优化方案并和后端小伙伴一起实现，提高用户对于产品的使用体验'
				}
			],
			projects: [
				{
					title: "医院项目",
					children: [{
						name: "南京河西美容医院",
						info: [
							{desc:"流程概况", link: "/project/yiyuanliucheng.html"},
							{desc: "具体详情", link: "/project/yiyuaninfo.html"},
						],
						time: "一年"
					},
					{
						name: "南京河西美容医院(皮肤)",
						info: [
							{desc:"点击查看", link: "/project/pifu.html"}
						],
						time: "一个月"
					},
					{
						name: "南京河西美容医院(仓库)",
						info: [
							{desc:"点击查看", link: "/project/cangku.html"}
						],
						time: "三个月"
					}]
				},
				{//
					title: "官网",
					children: [{
						name: "嘉凯城",
						info:[{desc: "点击查看", link: "http://www.calxon-group.com/"}],
						time: '7天'
					},
					{
						name: "卓诚酒店用品",
						info:[{desc: "点击查看", link: "http://www.zhuocheng-nj.com/"}],
						time: '10天'
					}]
				}
			],
			skills: [
				{
					title: '前端',
					children: [
						{
							name: 'HTML',
							link: '/front/html/',
							desc: ''
						},
						{
							name: 'CSS',
							link: '/front/css/',
							desc: ''
						},
						{
							name: 'Javascrpt',
							link: '/front/javascript/',
							desc: ''
						}
					]
				}
			]
		};
	},
	methods: {
		slidDown() {
			const h = this.$refs.post.offsetHeight;
			let v = window.scrollY;
			const handle = setInterval(function() {
				v += 10;
				if (h < v) {
					v = h;
					clearInterval(handle);
				}
				window.scroll(0, v);
			}, 10);
		}
	},
	mounted() {
		// console.log(this.$refs.content.parentElement);
		this.$refs.content.parentElement.style.maxWidth = 'none';
		this.$refs.content.parentElement.style.padding = 0;
	}
};
</script>
<style scoped="scoped">
.theme-default-content:not(.custom) {
	max-width: none;
	margin: 0 auto;
	padding: 0;
}

#content {
	min-width: 1200px;
	padding-bottom: 300px;
}

.post {
	height: 507px;
	background: url(/images/resume/bj.png) no-repeat center;
	width: 100%;
	background-size: cover;
	position: relative;
}

.post > p {
	width: 455px;
	height: 34px;
	font-size: 34px;
	letter-spacing: 6.8px;
	color: #ffffff;
	position: absolute;
	top: 100px;
	right: 440px;
}

.post .avater {
	width: 204px;
	/* height: 400px; */
	position: absolute;
	top: 80px;
	left: 45%;
	text-align: center;
}

.post .avater .imgs1 {
	width: 180px;
	height: 180px;
	border-radius: 50%;
}

.post .avater .pro {
	width: 200px;
	height: 230px;
	color: #ffffff;
	position: relative;
}
.post .avater .pro > p {
	margin: 0;
}

.post .avater .pro .name {
	font-size: 24px;
	/* margin-top: 10px; */
	line-height: 66px;
	letter-spacing: 0px;
}

.post .avater .pro .zhiye {
	font-size: 18px;
}

.zhiye1 {
	width: 36px;
	height: 36px;
	margin: 0px auto;
	position: absolute;
	bottom: -113px;
	left: 79px;
	animation: jiantou 1s infinite alternate;
	-moz-animation: jiantou 1s infinite alternate;
	-webkit-animation: jiantou 1s infinite alternate;
	cursor: pointer;
}

.zhiye1 img {
	width: 100%;
	height: 100%;
	cursor: pointer;
}

/* 动画 */

@keyframes jiantou {
	from {
		bottom: 0px;
	}

	to {
		bottom: 10px;
	}
}

@-moz-keyframes jiantou
	/* Firefox */ {
	from {
		bottom: -113px;
	}

	to {
		bottom: -87px;
	}
}

@-webkit-keyframes jiantou
	/* Safari 和 Chrome */ {
	from {
		bottom: -113px;
	}

	to {
		bottom: -87px;
	}
}

.post .avater .pro p a {
	font-size: 22px;
	font-weight: bold;
	letter-spacing: 2.2px;
	color: #ff3d4b;
	margin-right: 20px;
}

.post .avater .pro p span {
	font-size: 16px;
	color: #ffffff;
	margin-right: 20px;
}

.post .avater .pro .art_pic {
	margin-top: 10px;
}

.personal {
	margin-top: 124px;
}

.hea {
	width: 177px;
	height: 86px;
	position: relative;
	margin: 0 auto;
	margin-bottom: 70px;
}

.hea::before,
.hea::after {
	content: ' ';
	width: 34px;
	height: 39px;
	background-color: #393939;
	position: absolute;
}

.hea::after {
	right: 0;
	bottom: 0;
}

.hea .hea_con {
	width: 164px;
	height: 74px;
	margin: 0 auto;
	background: #fff;
	position: relative;
	z-index: 1;
	top: 6px;
}

.hea .hea_con .frist_w {
	width: 24px;
	height: 27px;
	font-family: FZCHSJW--GB1-0;
	font-size: 37.4px;
	font-style: italic;
	font-stretch: normal;
	line-height: 48px;
	letter-spacing: 7.5px;
	color: #ff3d4b;
	margin-left: 17px;
}

.hea .hea_con .w {
	position: absolute;
	font-family: AdobeHeitiStd-Regular;
	font-size: 22px;
	font-weight: bold;
	color: #c3c3c3;
}

.hea .hea_con > p {
	font-size: 24px;
	color: #333333;
	position: absolute;
	right: 16px;
	bottom: -14px;
}

.personal .msg {
	width: 1086px;
	padding-left: 104px;
	padding-top: 37px;
	margin: 0 auto;
	height: 262px;
	border-top: solid 1px #e9e9e9;
}

.personal .msg p {
	float: left;
	width: 300px;
	margin-top: 20px;
}

.personal .msg b {
	font-size: 18px;
	font-weight: bold;
	line-height: 48px;
	color: #333333;
}

.personal .msg span {
	font-size: 18px;
	line-height: 48px;
	color: #616161;
}

.qz {
	margin-top: 0;
}

.introduce {
	/* background: url(/images/resume/introduce_bg.jpg) no-repeat center; */
	background-size: cover;
	width: 1200px;
	height: 684px;
	margin: 0 auto;
	padding-top: 70px;
	position: relative;
}

.introduce > img {
	width: 40px;
	height: 22px;
	margin: 0 auto;
	display: block;
}

.introduce .education {
	font-size: 28px;
	/* color: rgba(243, 243, 243, 1); */
	line-height: 48px;
	position: absolute;
	right: 110px;
	top: 133px;
}

.introduce .education::after {
	content: ' ';
	width: 56px;
	height: 6px;
	/* border: 1px solid rgba(255, 61, 75, 1); */
	position: absolute;
	right: 0;
	display: block;
	background-color: rgba(255, 61, 75, 1);
}

.introduce .left {
	width: 231px;
	height: 241px;
	/* border: 1px solid rgba(255, 255, 255, 1); */
	border: 1px solid;
	float: left;
	position: absolute;
	top: 183px;
	left: 151px;
}

.introduce .left .time {
	height: 118px;
	width: 267px;
	/* background: #90383e; */
	background: rgb(234, 50, 63);
	font-size: 34px;
	font-family: DFPHeiW7;
	font-weight: bold;
	color: rgba(255, 255, 255, 1);
	line-height: 118px;
	text-align: center;
	transform: rotate(90deg);
	-webkit-transform: rotate(90deg);
	transform-origin: left;
	position: absolute;
	top: -40px;
}

.introduce .left .edc_bg {
	width: 190px;
	height: 177px;
	position: absolute;
	right: -81px;
	background: white;
	top: 29px;
}
.edc_bg .scholl{
	margin-top: 0;
}
.introduce .left .edc_bg span {
	width: 42px;
	height: 17px;
	font-size: 18px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	/* color: rgba(255, 255, 255, 1); */
	line-height: 48px;
}

.introduce .right {
	width: 522px;
	height: 163px;
	font-size: 18px;
	font-weight: 400;
	/* color: rgba(255, 255, 255, 1); */
	line-height: 48px;
	position: absolute;
	top: 256px;
	right: 94px;
}

.language {
	width: 1010px;
	height: 76px;
	position: absolute;
	bottom: 53px;
	left: 94px;
}

.language .lan_item {
	float: left;
	width: 270px;
	height: 50px;
	margin-right: 60px;
	color: #fff;
}

.language .lan_item .tit {
	font-size: 18px;
	line-height: 48px;
	color: #616161;
}

.lan_item .progress_bar {
	width: 185px;
	height: 4px;
	background: rgba(149, 149, 149, 1);
	border-radius: 2px;
	float: left;
	position: relative;
}

.language .progress_bar_on {
	width: 80%;
	height: 4px;
	background: rgba(149, 149, 149, 1);
	border-radius: 2px;
	position: absolute;
	background-color: #ff3d4b;
	top: 0;
	left: 0;
}

.language .lan_item .degree {
	float: right;
	margin-top: -8px;
	color: #616161;
}

/* 工作经验 */

.e_msg {
	width: 1086px;
	margin: 0 auto;
	border-top: solid 1px #e9e9e9;
	width: 1086px;
	padding-top: 138px;
	padding-bottom: 200px;
}

.e_msg .e_item {
	height: 180px;
}

.e_msg .w_circle {
	width: 24px;
	height: 24px;
	border: 2px solid rgba(226, 226, 226, 1);
	border-radius: 50%;
	position: relative;
	margin: 0 auto;
}

.e_msg .n_circle {
	width: 14px;
	height: 14px;
	background: rgba(226, 226, 226, 1);
	border-radius: 50%;
	position: absolute;
	top: 5.2px;
	left: 5.2px;
}

.e_msg .e_item.active .w_circle {
	border: 2px solid rgba(255, 61, 75, 1);
}

.e_msg .e_item.active .n_circle {
	background: rgba(255, 61, 75, 1);
}

.e_msg .up_line::before {
	content: ' ';
	width: 3px;
	height: 154px;
	background: rgba(243, 243, 243, 1);
	/* border: 1px solid rgba(226, 226, 226, 1); */
	display: block;
	position: absolute;
	left: 50%;
	margin-left: -0.5px;
	top: -156px;
}

.e_msg .up_line {
}

.e_msg .befor_company {
	width: 490px;
	height: 295px;
	/* background: rgba(59, 59, 59, 1); */
	border: 1px solid rgba(226, 226, 226, 1);
	border-radius: 10px;
	padding: 27px;

	position: absolute;
	left: 96px;
	top: -54px;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	/* Safari */
}

.befor_company {
	transition: All 0.4s ease-in-out;
	cursor: pointer;
}

.befor_company:hover {
	box-shadow: 0px 0px 10px #ccc;
	transform: translate(0, -10px);
	-webkit-transform: translate(-10px, 0px);
}

/* .befor_company:nth-of-type(even):hover {
	  
	} */

.e_msg > .e_item:nth-child(2n) .befor_company {
	left: -621px;
}

.e_msg > .e_item:nth-child(2n) .befor_company:hover {
	box-shadow: 0px 0px 10px #ccc;
	/* left: -612px; */
	transform: translate(0, 10px);
	-webkit-transform: translate(10px, 0px);
}

.e_msg > .e_item:nth-of-type(odd) .befor_company::before {
	content: ' ';
	width: 40px;
	height: 26px;
	position: absolute;
	left: -40px;
	top: 60px;
	background: url(/images/resume/left1.png) no-repeat center;
	background-size: 100%;
}

.e_msg > .e_item:nth-of-type(even) .befor_company::after {
	content: ' ';
	width: 40px;
	height: 26px;
	position: absolute;
	right: -40px;
	top: 60px;
	background-size: 100%;
	background: url(/images/resume/right1.png) no-repeat center;
}

.e_msg .befor_company h3 {
	font-size: 22px;
	color: rgba(255, 61, 75, 1);
	font-weight: 400;
	margin-bottom: 4px;
}

.e_msg .befor_company h3 > span {
	font-size: 18px;
	/* color: rgba(255, 255, 255, 1); */
	color: #616161;
}

.e_msg .befor_company > span {
	font-size: 18px;
	/* color: rgba(255, 255, 255, 1); */
	line-height: 30px;
	color: #616161;
}

/* .e_msg .befor_company>span {} */

.e_msg .befor_company > p {
	font-size: 18px;
	/* color: rgba(255, 254, 254, 1); */
	color: #616161;
	line-height: 48px;
	line-height: 48px;
}

/* .e_msg .befor_company>p>span {} */

/* 项目经验 */
.projects.msg, {
	height: auto;
	overflow: hidden;
}
.pro-item{
	overflow: hidden;
}
.projects h3 {
	margin-left: -105px;
	margin-bottom: 0;
} 
.pro-info{
	margin-right: 8px;
}
.projects.msg b {
	color: #333333ab;
}

/* 技能介绍 */

.skills.msg {
	height: auto;
}
.skills h3 {
	margin-left: -105px;
	margin-bottom: 0;
} 
.skills.msg .pro-item p {
	width: 100%;
	float: none;
}
.skills.msg .pro-item p a{
	margin-right: 10px;
}
</style>
