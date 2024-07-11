import { CSSProperties, useState } from 'react';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontFamilyOptions,
	ArticleStateType,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleStyles, setArticleStyles] = useState<ArticleStateType>({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleStylesSetState={setArticleStyles}
				options={{
					fontFamilyOptions,
					fontSizeOptions,
					fontColors,
					backgroundColors,
					contentWidthArr,
				}}
				articleStyles={articleStyles}
				defaultOptions={defaultArticleState}
			/>
			<Article />
		</main>
	);
};
