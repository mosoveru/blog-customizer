import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { MouseEventHandler, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = MouseEventHandler;
export type ArrowButtonProps = {
	handleClick?: OnClick;
	state?: boolean;
};

export const ArrowButton = ({ handleClick, state }: ArrowButtonProps) => {
	const firstInit = useRef<boolean | null>(state ?? false); //Задаём реф для пропуска первой инициализации

	const [buttonClass, setButtonClass] = useState(styles.container);
	const [arrowClass, setArrowClass] = useState(styles.arrow);

	useLayoutEffect(() => {
		//Меняем класс кнопки, если меняется переданный стейт
		if (state !== firstInit.current) {
			firstInit.current = null;
			if (buttonClass === styles.container) {
				setButtonClass(clsx(styles.container, styles.container_open));
				setArrowClass(clsx(styles.arrow, styles.arrow_open));
			} else {
				setButtonClass(styles.container);
				setArrowClass(styles.arrow);
			}
		}
	}, [state]);
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={buttonClass}
			onClick={handleClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowClass} />
		</div>
	);
};
