import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontFamilyOptions,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type ArticleStyles = {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

const App = () => {
	const defaultStyles = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	};

	const [articleStyles, setArticleStyles] = useState<ArticleStyles>({
		...defaultStyles,
	});

	return (
		<div className={clsx(styles.main)} style={articleStyles as CSSProperties}>
			<ArticleParamsForm
				articleResetStyles={defaultStyles}
				articleStylesSetState={setArticleStyles}
				options={{
					fontFamilyOptions,
					fontSizeOptions,
					fontColors,
					backgroundColors,
					contentWidthArr,
				}}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
