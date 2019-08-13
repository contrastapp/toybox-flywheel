const createMediaQuery = (n) => `@media screen and (min-width:${n}em)`;

const addAliases = (arr, aliases) =>
	aliases.forEach((key, i) =>
		Object.defineProperty(arr, key, {
			enumerable: false,
			get () {
				return this[i];
			},
		})
	);

export const breakpoints = [32, 40, 48, 64];

export const mediaQueries = breakpoints.map(createMediaQuery);

const aliases = ['sm', 'md', 'lg', 'xl'];

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);

export const space = {
	2: '2px',
	4: '4px',
	6: '6px',
	8: '8px',
	12: '12px',
	16: '16px',
	24: '24px',
	32: '32px',
	48: '48px',
	60: '60px',
	90: '90px',
	120: '120px',
};

export const fontSizes = {
	11: '11px',
	12: '12px',
	14: '14px',
	16: '16px',
	24: '24px',
	32: '32px',
};

export const lineHeights = {
	16: '16px',
	18: '18px',
	20: '20px',
	24: '24px',
	36: '36px',
	48: '48px',
};

export const font = '-apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif';

export const regular = 400;
export const bold = 600;

export const fontWeights = {
	regular,
	bold,
};

const letterSpacings = {
	normal: 'normal',
	caps: '0.025em',
};

// color palette
const black = '#212B36';
const white = '#fff';


const colors = {
	black,
	white,
	gray: {
		5: '#F9FAFB',
		10: '#F4F6F8',
		15: '#DFE3E8',
		20: '#C4CDD5',
		25: '#919EAB',
		30: '#9F9C9C',
		35: '#454F5B',
		primary: '#212B36',
		darken: '#000C18',
	},
	blue: {
		5: '#F2F8FD',
		10: '#99C8F3',
		primary: '#0074E0',
		darken: '#0041AD',
	},
	red: {
		5: '#FFE9E8',
		10: '#F79D99',
		primary: '#EB0800',
		darken: '#B80000',
	},
	green: {
		5: '#E5F7EA',
		10: '#99E3AB',
		primary: '#00B82E',
		darken: '#008500',
		success: '#33936B',
	},

};

export { colors };

// styled-system's `borderRadius` function can hook into the `radii` object/array
export const radii = [0, 3, 6];
export const radius = '3px';

export const maxContainerWidth = '1280px';

// boxShadows
export const boxShadows = [
	'0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)',
	'0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)',
	'0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)',
	'0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)',
];

// animation duration
export const duration = {
	fast: '150ms',
	normal: '300ms',
	slow: '450ms',
	slowest: '600ms',
};

// animation easing curves
const easeInOut = 'cubic-bezier(0.5, 0, 0.25, 1)';
const easeOut = 'cubic-bezier(0, 0, 0.25, 1)';
const easeIn = 'cubic-bezier(0.5, 0, 1, 1)';

const timingFunctions = {
	easeInOut,
	easeOut,
	easeIn,
};

// animation delay
const transitionDelays = {
	small: '60ms',
	medium: '160ms',
	large: '260ms',
	xLarge: '360ms',
};

const hoverStyles = {
	default: {
		boxShadow: 'none',
		border: `1px solid ${colors.gray['20']}`,
		'&:hover': {
			backgroundColor: colors.gray['10'],
			transition: 'all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s',
			border: `1px solid ${colors.gray['20']}`,
		},
		'&:focus': {
			backgroundColor: colors.gray['10'],
			transition: 'all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s',
			border: `1px solid ${colors.gray['20']}`,
		},
		'&:active': {
			backgroundColor: colors.gray['10'],
			borderColor: colors.gray['25'],
			boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.16), 0 1px 1px 0 rgba(0,0,0,0.16);',
		},
		'&:disabled': {
			backgroundColor: colors.gray['5'],
			borderColor: colors.gray['15'],
			color: `${colors.gray['25']} !important`,
		},
	},
	primary: {
		boxShadow: 'none',
		'&:hover': {
			background: colors.blue.darken,
			color: 'white',
			transition: 'all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s',
			border: '1px solid rgba(0,0,0,0)',
		},
		'&:focus': {
			outline: 'none',
			background: colors.blue.primary,
			color: 'white',
		},
		'&:active': {
			borderColor: colors.blue.darken,
			background: colors.blue.primary,
			color: 'white',
			boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.24), 0 1px 1px 0 rgba(0,0,0,0.16);',
		},
		'&:disabled': {
			color: 'white',
			backgroundColor: colors.blue['10'],
		},
	},
	hyperlink: {
		boxShadow: 'none',
		'&:hover': {
			color: colors.blue.primary,
			backgroundColor: colors.blue['10'],
			transition: 'all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s',
			border: '1px solid rgba(0,0,0,0)',
		},
		'&:focus': {
			color: colors.blue.primary,
			outline: 'none',
		},
		'&:active': {
			color: colors.blue.primary,
			borderColor: colors.blue.darken,
			boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.24), 0 1px 1px 0 rgba(0,0,0,0.16);',
		},
	},
	icon: {
		boxShadow: 'none',
		height: '60px',
		borderRadius: '0px',
		'&:hover': {
			backgroundColor: 'white',
			boxShadow: 'none',
			border: '1px solid rgba(0,0,0,0)',
		},
		'&:active': {
			backgroundColor: 'white',
			boxShadow: 'none',
		},
		'&:focus': {
			outline: 'none',
			boxShadow: 'none',
		},
	},
	ctool: {
		backgroundColor: 'transparent',
		boxShadow: 'none',
		border: '1px solid rgba(0,0,0,0)',
		borderRadius: '0px',
		'&:hover': {
			backgroundColor: colors.gray['10'],
			transition: 'all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s',
		},
		'&:active': {
			backgroundColor: colors.gray['10'],
			borderColor: colors.gray['10'],
			boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.16), 0 1px 1px 0 rgba(0,0,0,0.16);',
		},
		'&:focus': {
			outline: 'none',
		},
	},
	destruct: {
		boxShadow: 'none',
		'&:hover': {
			color: 'white',
			backgroundColor: colors.red.darken,
			transition: 'all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s',
		},
		'&:focus': {
			color: 'white',
			outline: 'none',
		},
		'&:active': {
			color: 'white',
			borderColor: colors.red.primary,
			boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.24), 0 1px 1px 0 rgba(0,0,0,0.16);',
		},
		'&:disabled': {
			color: 'white',
			backgroundColor: colors.red['10'],
		},
	},
	success: {
		boxShadow: 'none',
		'&:hover': {
			color: 'white',
			backgroundColor: colors.green.success,
			transition: 'all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s',
		},
		'&:focus': {
			color: 'white',
			backgroundColor: colors.green.success,
			transition: 'all 0.2s cubic-bezier(0.2, 0.91, 0.85, 0.96) 0s',
		},
		'&:active': {
			color: 'white',
			borderColor: colors.green.success,
			boxShadow: 'inset 0 1px 4px 0 rgba(0,0,0,0.24), 0 1px 1px 0 rgba(0,0,0,0.16);',
		},
		'&:disabled': {
			color: 'white',
			backgroundColor: colors.green['10'],
		},
	},
};


const theme = {
	hoverStyles,
	lineHeights,
	breakpoints,
	mediaQueries,
	space,
	font,
	fontSizes,
	fontWeights,
	letterSpacings,
	regular,
	bold,
	colors,
	radii,
	radius,
	boxShadows,
	maxContainerWidth,
	duration,
	timingFunctions,
	textStyles: {
		caps: {
			textTransform: 'uppercase',
		},
	},
	transitionDelays,
};

export default theme;
