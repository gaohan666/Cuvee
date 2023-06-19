import React, {
	FC,
	useMemo,
	createRef,
	useEffect,
	useState,
	useCallback
} from 'react'
import { DownOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons'
import style from './style/index.module.less'

interface Options {
	label: string | number
	value: string | number
	disabled?: boolean
}
type onSelect = (e: any) => void
type onChange = (e: any) => void
interface SelectProps {
	/**
	 * @description 选择器数据
	 * @default []
	 */
	option: Array<Options>
	/**
	 * @description 宽度
	 * @default 80px
	 */
	width?: number
	/**
	 * @description 提示
	 * @default false
	 */
	placeholder?: string
	/**
	 * @description 禁用状态
	 * @default false
	 */
	disabled?: boolean
	/**
	 * @description 加载状态
	 * @default false
	 */
	loading?: boolean
	/**
	 * @description 可输入状态
	 * @default false
	 */
	showSearch?: boolean
	/**
	 * @description 可输入状态下清除
	 * @default false
	 */
	clearable?: boolean
	handleSelectCallback?: onSelect
	handleTextChange?: onChange
}

const Select: FC<SelectProps> = (props) => {
	const {
		option,
		width,
		placeholder,
		disabled,
		loading,
		showSearch,
		clearable,
		handleSelectCallback,
		handleTextChange
	} = props
	const [selected, setSelected] = useState<string | number | any>('')
	const optionRef = createRef() as any

	useEffect(() => {
		optionRef.current.style.height = `0px`
	}, [])
	const ownsWidth = useMemo(() => {
		//传参宽度
		if (width) {
			return {
				width: `${width}px`
			}
		}
		return {}
	}, [width])
	//禁用状态
	const disabledStyle = useMemo(() => {
		if (disabled) {
			return {
				cursor: 'not-allowed',
				background: 'rgb(238, 238, 238)'
			}
		}
	}, [disabled])
	const inputFilterOptions = useMemo(() => {
		//输入状态options过滤
		return option.filter((item) => {
			return (item.label as string).includes(selected)
		})
	}, [option, selected])
	const handleInputChange = useCallback(
		(e: any) => {
			//输入后的回调
			setSelected(e.target.value)
			// optionRef.current.style.height =
			// 	option.filter((item) => {
			// 		return (item.label as string).includes(e.target.value)
			// 	}).length *
			// 		100 +
			// 	'%'
			if (handleTextChange) {
				handleTextChange(e.target.value)
			}
		},
		[selected]
	)
	const toggleOptions = (e: any) => {
		//切换下拉
		e.stopPropagation()
		if (disabled) return
		if (optionRef.current.style.height === '0px') {
			if (showSearch) {
				optionRef.current.style.height = `${inputFilterOptions.length * 100}%`
			} else {
				optionRef.current.style.height = `${option.length * 100}%`
			}
		} else {
			optionRef.current.style.height = '0px'
		}
	}
	const changeOptions = (v: Options, e: any) => {
		//选择选项
		e.stopPropagation()
		if (v.disabled) return
		optionRef.current.style.height = '0px'
		setSelected(v.label)
		if (handleSelectCallback) {
			handleSelectCallback(v.value)
		}
	}

	return showSearch ? (
		<>
			<div className={style.select} style={{ ...ownsWidth, ...disabledStyle }}>
				<div className={style.selected}>
					<input
						type="text"
						className={style.selected}
						value={selected}
						placeholder={placeholder as string}
						onClick={toggleOptions}
						onChange={(e) => handleInputChange(e)}
					/>
					{clearable ? (
						<CloseOutlined onClick={() => setSelected('')} />
					) : (
						<DownOutlined onClick={toggleOptions} />
					)}
				</div>
				<div className={style.selectOptions} style={ownsWidth} ref={optionRef}>
					{inputFilterOptions.map((s) => {
						return (
							<div
								key={s.label as any}
								className={style.option}
								style={
									s.disabled
										? {
												cursor: 'not-allowed',
												background: 'rgb(238, 238, 238)'
										  }
										: {}
								}
								onClick={(e) => changeOptions(s as Options, e)}
							>
								{s.label}
							</div>
						)
					})}
				</div>
			</div>
		</>
	) : (
		<div className={style.select} style={{ ...ownsWidth, ...disabledStyle }}>
			<div className={style.selected} onClick={toggleOptions}>
				{selected ? (
					<div className={style.size}>{selected}</div>
				) : (
					(placeholder && (
						<div className={style.placeholder}>{placeholder}</div>
					)) || <div />
				)}
				{loading ? <LoadingOutlined /> : <DownOutlined />}
			</div>
			<div className={style.selectOptions} style={ownsWidth} ref={optionRef}>
				{option.map((s) => {
					return (
						<div
							key={s.label as any}
							className={style.option}
							style={
								s.disabled
									? { cursor: 'not-allowed', background: 'rgb(238, 238, 238)' }
									: {}
							}
							onClick={(e) => changeOptions(s as Options, e)}
						>
							{s.label}
						</div>
					)
				})}
			</div>
		</div>
	)
}
export default Select
