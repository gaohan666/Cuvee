import { defineConfig } from 'dumi'

let base: string | undefined
let publicPath: string | undefined

if (process.env.NODE_ENV === 'production' && process.env.PREVIEW !== '1') {
	base = '/Cuvee/'
	publicPath = '/Cuvee/'
}

export default defineConfig({
	base,
	publicPath,
	title: 'Cuvee', // 站点名称
	outputPath: 'doc-dist', // 输出文件夹
	resolve: {
		docDirs: ['docs'],
		atomDirs: [{ type: 'component', dir: '/packages/components/src' }],
		codeBlockMode: 'passive'
	},
	themeConfig: {
		name: 'Cuvee',
		carrier: 'dumi', // 设备状态栏左侧的文本内容
		hd: true,
		rtl: true,
		nav: [
			{
				title: '指南',
				link: '/guide'
			},
			{
				title: '组件',
				link: '/components/alert'
			}
		]
	}
})
