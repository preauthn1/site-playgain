<template>
	<view>
		<view class="bg-white p-26 mt-30">
			<view class="font-26">
				消费值
			</view>
			<view class="mt-30 font-24">
				消费值是用户购买旅游套餐和商品时所支付的订单金额
			</view>
		</view>
		
		<view class="bg-white box-shadow-1 mt-40 ptb-24 pr-18">
			<view class="text-3D91F5 font-26">会员等级升级规则</view>
			<view class="font-24">
				<view class="flex justify-between items-center ptb-30 list-one pr-10 pl-24">
					<text>会员等级</text>
					<text>所需消费值</text>
				</view>
				<template v-for="(item,index) in levelList">
					<view class="flex justify-between items-center ptb-30 pr-10 pl-24" :class="index%2==0?'':'list-one'">
						<text>{{item.name}}</text>
						<text>{{item.money}}</text>
					</view>
				</template>
			</view>
		</view>
		<view class="plr-26 mt-20 font-26">
			 达到不同会员等级的消费值之后系统自动升级为下一等级的会员，并开启对应权益  
		</view>
		<view class="plr-26 mt-40">
			<view class="font-26 font-medium pb-40">注意事项</view>
			<view class="font-24">
				1.会员用户在使用会员服务的过程中，要严格遵守法律法规，不得利用漏洞，技术手段等牟取不当利益，一经发现，玩赚全球有权扣除对应消费值，取消该用户会员资格，且需要承担法律责任；
				2.在法律许可的范围内，玩赚全球将根据需要对会员规则做调整，包括升级条件及权益内容，如有重大调整，将通过应用通知、短信等方式及时通知您。
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { viplevel } from '@/api/vip';
	const levelList = ref([])
	viplevel().then(res => {
		levelList.value = res
	})
</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
.list-one{
	background: #F8FDFE;
	box-shadow: 0rpx 0rpx 7rpx 0rpx rgba(15,9,13,0.06);
}
</style>