import React, { useMemo, FC, memo } from 'react'
import './style/index'
type onClick = () => void
interface ButtonProps {
	//自定义button接口
	/**
	 * @description 按钮主题
	 * @default primary
	 */
	type?: string
	/**
	 * @description 宽度
	 */
	width?: number
	/**
	 * @description 高度
	 */
	height?: number
	/**
	 * @description 禁用状态
	 * @default false
	 */
	disabled?: boolean
	/**
	 * @description 字体按钮
	 * @default false
	 */
	circle?: boolean
	/**
	 * @description 按钮边框为虚线
	 * @default false
	 */
	dashed?: boolean
	/**
	 * @description 加载状态
	 * @default false
	 */
	loading?: boolean
	/**
	 * @description 按钮点击回调事件
	 */
	handleClick?: onClick | undefined
}
interface ButtonStyle {
	//button样式接口
	width?: string
	height?: string
	borderRadius?: string
	border?: string
	cursor?: string
}
type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'> //原生button接口

const Button: FC<ButtonProps & NativeButtonProps> = memo((props) => {
	const {
		type,
		width,
		height,
		disabled,
		circle,
		dashed,
		loading,
		handleClick,
		children
	} = props

	const buttonStyle = useMemo(() => {
		if (
			!type &&
			type !== 'danger' &&
			type !== 'warning' &&
			type !== 'warning' &&
			type !== 'text'
		) {
			return 'primary'
		}
		return type as any
	}, [type])
	const buttonSize = useMemo(() => {
		let size: ButtonStyle = {
			width: '100px',
			height: '40px'
		}
		if (width) {
			size.width = width + 'px'
		}
		if (height) {
			size.height = height + 'px'
		}
		if (circle) {
			size = { ...size, borderRadius: '50%' }
		}
		if (dashed && type === 'text') {
			size = { ...size, border: '1px dashed #ccc' }
		}
		if (disabled) {
			size = { ...size, cursor: 'not-allowed' }
		}
		return size
	}, [width, height, circle, dashed])
	return (
		<div className="button">
			<button
				className={buttonStyle}
				style={buttonSize as any}
				disabled={disabled ? true : false}
				onClick={handleClick as undefined}
			>
				{loading && <div className="loading1" />}
				{children}
			</button>
		</div>
	)
})
export default Button
