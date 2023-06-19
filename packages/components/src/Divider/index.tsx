import React, { FC, useMemo, memo, ReactNode } from 'react'
import './style/index'

interface dividerProps {
	/**
	 * @description 字体大小
	 */
	fontSize?: number
	/**
	 * @description 分割线颜色
	 * @default #cccccc
	 */
	borderColor?: string
	/**
	 * @description 对齐方式
	 * @default center
	 */
	align?: string
	/**
	 * @description 分割线类型
	 * @default border
	 */
	dashed?: boolean
	children?: ReactNode
}
const Divider: FC<dividerProps> = memo((props) => {
	const { children, fontSize, borderColor, align, dashed } = props
	const lineAlign = useMemo(() => {
		if (align === 'left') {
			return {
				justifyContent: 'left'
			}
		} else if (align === 'right') {
			return {
				justifyContent: 'right'
			}
		}
		return {}
	}, [align])
	const lineColor = useMemo((): object => {
		if (borderColor) {
			return {
				borderColor: borderColor
			}
		}
		return {}
	}, [borderColor])
	const textStyle = useMemo(() => {
		if (fontSize) {
			return {
				fontSize: `${fontSize}px`
			}
		}
	}, [fontSize])
	return (
		<div className="divider">
			<div
				className={dashed ? 'dashed' : 'line'}
				style={{ ...lineAlign, ...lineColor }}
			>
				{children && (
					<span className="line-text" style={textStyle}>
						{children}
					</span>
				)}
			</div>
		</div>
	)
})
export default Divider
