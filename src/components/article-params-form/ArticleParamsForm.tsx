import { ArrowButton } from 'components/arrow-button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { OptionType } from 'src/constants/articleProps';
import { Button } from 'components/button';
import { MouseEventHandler, SetStateAction, useRef, useState } from 'react';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ArticleStyles } from 'src/index';

type ArticleParamsFormProps = {
	articleStylesSetState: React.Dispatch<SetStateAction<ArticleStyles>>;
	readonly articleResetStyles: ArticleStyles;
	options: ArticleOptions;
};

type ArticleOptions = {
	fontSizeOptions: OptionType[];
	fontFamilyOptions: OptionType[];
	fontColors: OptionType[];
	backgroundColors: OptionType[];
	contentWidthArr: OptionType[];
};

export const ArticleParamsForm = ({
	articleStylesSetState,
	articleResetStyles,
	options,
}: ArticleParamsFormProps) => {
	const {
		fontSizeOptions,
		fontFamilyOptions,
		fontColors,
		backgroundColors,
		contentWidthArr,
	} = options;
	const spacingStyles = {
		width: 554,
		height: 50,
	};

	const asidePanel = useRef<HTMLElement>(null);
	const arrowButton = useRef<HTMLDivElement | null>(null);

	const [panelClass, setPanelClass] = useState(styles.container);
	const [isOpen, setOpen] = useState(false);
	const changedStylesRef = useRef<ArticleStyles>({ ...articleResetStyles });
	const [selectedFont, setSelectedFont] = useState(fontFamilyOptions[0]);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
	const [selectedFontColor, setSelectedFontColor] = useState(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);

	const openPanel = () => {
		setPanelClass(clsx(styles.container, styles.container_open));
		setOpen(true);
		document.addEventListener('click', handleOutsideClick, true);
	};

	const closePanel = () => {
		setPanelClass(clsx(styles.container));
		setOpen(false);
		document.removeEventListener('click', handleOutsideClick, false);
	};

	const clickButton: MouseEventHandler = (e) => {
		e.stopPropagation();
		if (!isOpen) {
			openPanel();
		} else {
			closePanel();
		}
	};

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as Node;
		if (
			asidePanel.current &&
			!asidePanel.current?.contains(target) &&
			!arrowButton.current?.contains(target)
		) {
			closePanel();
		}
	};

	const resetStyles = () => {
		articleStylesSetState({ ...articleResetStyles });
		setSelectedFont({ ...fontFamilyOptions[0] });
		setSelectedFontSize({ ...fontSizeOptions[0] });
		setSelectedFontColor({ ...fontColors[0] });
		setBackgroundColor({ ...backgroundColors[0] });
		setContentWidth({ ...contentWidthArr[0] });
	};

	const submitStyles = () => {
		if (changedStylesRef.current) {
			articleStylesSetState({ ...changedStylesRef.current });
		}
	};

	return (
		<>
			<ArrowButton state={isOpen} handleClick={clickButton} ref={arrowButton} />
			<aside className={panelClass} ref={asidePanel}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<Text as={'h2'} uppercase family='open-sans' size={31} weight={800}>
						Задайте параметры
					</Text>
					<div style={spacingStyles} />
					<Select
						onChange={(option) => {
							changedStylesRef.current['--font-family'] = option.value;
							setSelectedFont({ ...option });
						}}
						options={fontFamilyOptions}
						title='Шрифт'
						selected={selectedFont}
					/>
					<div style={spacingStyles} />
					<RadioGroup
						name={'Размер шрифта'}
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={(option) => {
							changedStylesRef.current['--font-size'] = option.value;
							setSelectedFontSize({ ...option });
						}}
						title='Размер шрифта'
					/>
					<div style={spacingStyles} />
					<Select
						onChange={(option) => {
							changedStylesRef.current['--font-color'] = option.value;
							setSelectedFontColor({ ...option });
						}}
						options={fontColors}
						selected={selectedFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<div style={spacingStyles} />
					<Select
						onChange={(option) => {
							changedStylesRef.current['--bg-color'] = option.value;
							setBackgroundColor({ ...option });
						}}
						options={backgroundColors}
						selected={backgroundColor}
						title='Цвет фона'
					/>
					<div style={spacingStyles} />
					<Select
						onChange={(option) => {
							changedStylesRef.current['--container-width'] = option.value;
							setContentWidth({ ...option });
						}}
						options={contentWidthArr}
						selected={contentWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={resetStyles}
							buttonStyles={{ '--blend': 'difference', '--hover': '#FFF' }}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={submitStyles}
							buttonStyles={{ '--button-bg': '#FFC802', '--hover': '#FFEDAB' }}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
