import { Text } from '../common/elements';

const TITLE = 'Title';
const IMAGE_SELECT = 'ImageSelect';
const TEXT_AREA = 'TextArea';
const LINK = 'Link';

const configElementMap = {
	[ TITLE ]: Text,
	[ IMAGE_SELECT ]: '',
	[ TEXT_AREA ]: '',
	[ LINK ]: '',
};

export const mapConfigToElement = ( config ) => {
	return configElementMap[ config.type ] || null;
};

export const mapConfigToFields = ( config ) => {
	return config.reduce( ( acc, current ) => {
		acc[ current.name ] = {
			type: current.type,
			label: current.label,
			value: current.default,
		};
		return acc;
	}, {} );
};
