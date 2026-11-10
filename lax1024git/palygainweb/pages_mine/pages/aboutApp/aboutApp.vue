<template>
	<view>
		<view class="plr-26 ptb-40">
			<view class="about-content">
				<image src="../../static/img/about-bg.png" mode="widthFix" class="w100"></image>
				<view class="plr-18">
					<view> 定位：文旅个性化综合服务平台 </view>
					<view>使命：推动中国文旅产业发展 </view>
					<view>口号：游遍祖国，走遍世界</view>
					<view>愿景：致力于打造中国头部互联网文旅平台</view>
				</view>
			</view>
		</view>
		<view class="protocol">
			<u-cell-group :border="false">
				<u-cell  title="用户服务协议" is-link url="/pages/agreement/agreement?type=1"></u-cell>
				<u-cell  title="隐私政策" is-link url="/pages/agreement/agreement?type=2"></u-cell>
				<u-cell  title="经营资质信息" is-link :border="false" url="/pages/agreement/agreement?type=7"></u-cell>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script setup>

</script>

<style>
	page {
		background: var(--primary-bg);
	}
</style>
<style lang="scss" scoped>
	.about-content {
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(15, 9, 13, 0.06);
		border-radius: 15rpx;
		overflow: hidden;
		font-weight: 500;
		font-size: 26rpx;
		color: #0B0B0B;
		padding-bottom: 38rpx;
	}
	.protocol{
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 26rpx 1rpx rgba(15,9,13,0.06);
	}
</style>