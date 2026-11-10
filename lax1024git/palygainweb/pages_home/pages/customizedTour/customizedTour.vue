<template>
	<view class="customized-tour">
		<image src="../../static/img/customized/bg.png" mode="widthFix" class="w100 customized-tour-bg"></image>
		<u-navbar title="定制游" bg-color="transparent" :autoBack="true" left-icon-color="#fff" :title-style="{color:'#fff'}"
			:placeholder='true'>
			<template #right>
				<navigator url="/pages_home/pages/customizedTour/myCustom">
					<view class="customized-tour-head-right">
						<image src="../../static/img/customized/location.png"></image>
						<view>我的定制</view>
					</view>
				</navigator>
			</template>
		</u-navbar>
		<view class="customized-tour-content">
			<view class="plr-26 mt-80">
				<view class="customized-tour-content-title">定 制 游 热 销</view>
				<view class="font-30 font-medium text-white customized-tour-content-slogan mt-24">
					<view>为您提供更优质的服务</view>
					<view>只为您的旅途开心</view>
				</view>

			</view>
			<view class="flex justify-center mt-80">
				<view v-for="(item,index) in tabList" :key="index" class="tab" :class="chooseTab == index +1 ?'active':''" @click="chooseType(index + 1)">
					<view class="relative zIndex1"> {{item.name}}</view>
				</view>
			</view>
			<view class="flex mt-70 mlr-80">
				<view @click="showCity=true">
					<u-input v-model="formData.startcity" disabled placeholder="出发地" border="none" suffixIcon="arrow-right"
						suffixIconStyle="color: #767676" :customStyle="{background: 'transparent'}"
						:placeholderStyle="{color: '#767676'}"></u-input>
				</view>
				<view class="plr-40">
					<image src="../../static/img/customized/train.png" style="width: 130rpx;height: 34rpx;" class="">
					</image>
				</view>
				<view>
					<u-input v-model="formData.endcity" placeholder="目的地" border="none" suffixIcon="arrow-right"
						suffixIconStyle="color: #767676" :customStyle="{background: 'transparent'}"
						:placeholderStyle="{color: '#767676'}"></u-input>

				</view>
			</view>

			<view class="flex items-center plr-26 mt-80">
				<view class="font-26 text-0B0B0B font-medium">手机号码</view>
				<u-input placeholder="请输入手机号码" border="bottom" maxlength="11" v-model="phone"  :placeholderStyle="{color: '#AEAEAE'}" type="number"></u-input>
			</view>
			<view class="plr-60 mt-80">
				<u-button color="linear-gradient(0deg, #3B8EF5, #6BDBFB)" :custom-style="{height:'100rpx',fontSize:'30rpx'}" @click="submit">获取专属定制方案</u-button>
			</view>
			
			<view class="plr-24">
				<view class="flow-title">
					定制流程
				</view>
				<view class="flex font-26 text-767676 items-center justify-between mt-30">
					<template v-for="(item,index) in flowList" :key="index">
						<image src="../../static/img/customized/arrow-right.png" class="width-26" mode="widthFix" v-if="index>0"></image>
						<view class="text-center">
							<image :src="item.img" style="height: 53rpx;" mode="heightFix"></image>
							<view>{{item.name}}</view>
						</view>
					</template>
				</view>
			</view>
		</view>
		<select-city v-model="showCity" @choosestartcity="choosestartcity"></select-city>
	</view>
</template>

<script setup>
	import SelectCity from './components/SelectCity.vue';
	import {
		reactive,
		ref
	} from 'vue';
	let tabList = ref([{
			name: '企业定制'
		},
		{
			name: '私人订制'
		}
	])
	let chooseTab = ref(1);
	const phone = ref()
	let formData = reactive({
		startcity: '',
		endcity:''
	});
	let showCity = ref(false);
	
	let flowList = reactive([
		{name:'提出需求',img:'/pages_home/static/img/customized/flow-1.png'},
		{name:'确认需求',img:'/pages_home/static/img/customized/flow-2.png'},
		{name:'定制行程',img:'/pages_home/static/img/customized/flow-3.png'},
		{name:'预约付款',img:'/pages_home/static/img/customized/flow-4.png'},
		{name:'开心旅行',img:'/pages_home/static/img/customized/flow-5.png'},
	])
	const chooseType = (num) => {
		chooseTab.value = num
	}
	const choosestartcity = (startcity) => {
		formData.startcity = startcity
	}
	const submit = ()=>{
		if(formData.startcity && formData.endcity && phone.value){
			console.log('下一步')
			uni.navigateTo({
				url:`/pages_home/pages/customizedTour/customizedTourForm?startcity=${formData.startcity}&endcity=${formData.endcity}&phone=${phone.value}&type=${chooseTab.value}`
			})
		}else{
			uni.showToast({
				icon:"none",
				title:"请您填写完整信息"
			})
		}
		
	}
</script>

<style lang="scss" scoped>
	.customized-tour {
		position: relative;

		&-bg {
			position: absolute;
		}

		&-content {
			position: relative;
			z-index: 1;

			&-title {
				font-family: Tensentype MaiHeiJ;
				font-weight: 600;
				text-shadow: 0rpx 0rpx 5rpx rgba(127, 134, 155, 0.27);
				background: linear-gradient(180deg, #3B8EF5 0%, #6BDBFB 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				font-size: 80rpx;
				color: #3D91F5;
				-webkit-text-stroke: 2rpx #FBE44DFF;
				
			}

			&-slogan {
				color: #FCFAF6;
			}
		}

		.tab {
			color: #666;
			padding: 0 16rpx;
			font-weight: 500;
			font-size: 28rpx;
			position: relative;
		}

		.tab.active {
			color: #0B0B0B;
		}

		.tab.active::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 15rpx;
			background: linear-gradient(0deg, #FBE44D, #6BDBFB);
			border-radius: 8rpx;
			left: 0;
			bottom: 0;
		}
	}

	.customized-tour-head-right {
		display: flex;
		align-items: center;
		font-weight: 500;
		font-size: 28rpx;
		color: #EDC74B;

		image {
			width: 44rpx;
			height: 42rpx;
		}
	}
	.flow-title{
		position: relative;
		padding-left: 14rpx;
		margin-top: 100rpx;
		font-weight: 500;
		font-size: 30rpx;
		color: #0B0B0B;
	}
	.flow-title:before{
		content: '';
		width: 8rpx;
		height: 38rpx;
		background: linear-gradient(0deg, #3B8EF5, #6BDBFB);
		border-radius: 4rpx;
		position: absolute;
		left: 0;
	}
</style>