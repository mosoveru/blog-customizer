import { ArrowButton } from 'components/arrow-button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';
import { Button } from 'components/button';
import { MouseEventHandler, SetStateAction, useRef, useState } from 'react';
import { Text } from '../text';
import { useClose } from './hooks/useClose';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	articleStylesSetState: React.Dispatch<SetStateAction<ArticleStateType>>;
	options: ArticleOptions;
	articleStyles: ArticleStateType;
	defaultOptions: ArticleStateType;
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
	articleStyles,
	options,
	defaultOptions,
}: ArticleParamsFormProps) => {
	//Объект с опциями для Select компонентов
	const {
		fontSizeOptions,
		fontFamilyOptions,
		fontColors,
		backgroundColors,
		contentWidthArr,
	} = options;
	//Объект с дефолтными опциями
	const {
		fontFamilyOption,
		fontColor,
		backgroundColor,
		contentWidth,
		fontSizeOption,
	} = defaultOptions;
	//Стили для отступов в форме
	const spacingStyles = {
		width: 554,
		height: 50,
	};
	//Реф боковой панели и реф для сохранения измененных стилей
	const asidePanel = useRef<HTMLElement>(null);
	const changedStylesRef = useRef<ArticleStateType>({ ...articleStyles });
	//Стейты для класса боковой панели, состояние панели, а также стейты для Select-компонентов
	const [panelClass, setPanelClass] = useState(styles.container);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOption);
	const [selectedFontColor, setSelectedFontColor] = useState(fontColor);
	const [selectedBackgroundColor, setBackgroundColor] =
		useState(backgroundColor);
	const [selectedContentWidth, setContentWidth] = useState(contentWidth);
	//Функция, которая открывает панель
	const openPanel = () => {
		setPanelClass(clsx(styles.container, styles.container_open));
		setMenuOpen(true);
	};
	//Функция, которая закрывает панель
	const closePanel = () => {
		setPanelClass(styles.container);
		setMenuOpen(false);
	};
	//Используем хук, чтобы убрать/навесить слушатель на клик вне панели и на событие клавиатуры
	useClose({ isOpen: isMenuOpen, onClose: closePanel, rootRef: asidePanel });
	//Обработчик клика по кнопке со стрелочкой
	const clickButton: MouseEventHandler = () => {
		if (!isMenuOpen) {
			openPanel();
		}
	};
	//Функция для сброса всех значений в значение по умолчанию
	const resetStyles = () => {
		articleStylesSetState({ ...defaultOptions });
		changedStylesRef.current = { ...defaultOptions };
		setSelectedFont({ ...fontFamilyOption });
		setSelectedFontSize({ ...fontSizeOption });
		setSelectedFontColor({ ...fontColor });
		setBackgroundColor({ ...backgroundColor });
		setContentWidth({ ...contentWidth });
	};
	//Функция, которая записывает изменения стилей в стейт
	const submitStyles = () => {
		if (changedStylesRef.current) {
			articleStylesSetState({ ...changedStylesRef.current });
		}
	};

	return (
		<>
			<ArrowButton state={isMenuOpen} handleClick={clickButton} />
			<aside className={panelClass} ref={asidePanel}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						submitStyles();
					}}>
					<Text as={'h2'} uppercase family='open-sans' size={31} weight={800}>
						Задайте параметры
					</Text>
					<div style={spacingStyles} />
					<Select
						onChange={(option) => {
							changedStylesRef.current.fontFamilyOption = option;
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
							changedStylesRef.current.fontSizeOption = option;
							setSelectedFontSize({ ...option });
						}}
						title='Размер шрифта'
					/>
					<div style={spacingStyles} />
					<Select
						onChange={(option) => {
							changedStylesRef.current.fontColor = option;
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
							changedStylesRef.current.backgroundColor = option;
							setBackgroundColor({ ...option });
						}}
						options={backgroundColors}
						selected={selectedBackgroundColor}
						title='Цвет фона'
					/>
					<div style={spacingStyles} />
					<Select
						onChange={(option) => {
							changedStylesRef.current.contentWidth = option;
							setContentWidth({ ...option });
						}}
						options={contentWidthArr}
						selected={selectedContentWidth}
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
							buttonStyles={{ '--button-bg': '#FFC802', '--hover': '#FFEDAB' }}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
