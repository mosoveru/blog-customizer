import { Text } from 'components/text';

import styles from './Button.module.scss';
import { CSSProperties } from 'react';

interface ButtonStyles extends CSSProperties {
	'--blend'?: string;
	'--hover'?: string;
	'--button-bg'?: string;
}

export const Button = ({
	title,
	onClick,
	type,
	buttonStyles = {},
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	buttonStyles?: ButtonStyles;
}) => {
	return (
		<button
			className={styles.button}
			style={buttonStyles}
			type={type}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
