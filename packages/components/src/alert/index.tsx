import React from 'react'
import './style/index'
export interface AlertProps {
	kind?: 'info' | 'positive' | 'negative' | 'warning'
	children?: any
}

export type KindMap = Record<Required<AlertProps>['kind'], string>

const prefixCls = 'happy-alert'

const kinds: KindMap = {
	info: '#5352ED',
	positive: '#2ED573',
	negative: '#FF4757',
	warning: '#FFA502'
}

const Alert: React.FC<AlertProps> = ({ children, kind = 'info' }) => (
	<div
		className={prefixCls}
		style={{
			background: kinds[kind]
		}}
	>
		{children}
	</div>
)

export default Alert
