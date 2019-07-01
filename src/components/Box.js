import styled from 'styled-components';
import { themeGet , space,
	width,
	cursor,
	fontSize,
	textColor,
	bgColor,
	color,
	fontFamily,
	textAlign,
	lineHeight,
	fontWeight,
	fontStyle,
	letterSpacing,
	display,
	maxWidth,
	minWidth,
	height,
	maxHeight,
	minHeight,
	sizeWidth,
	sizeHeight,
	size,
	ratioPadding,
	ratio,
	verticalAlign,
	alignItems,
	alignContent,
	justifyItems,
	justifyContent,
	flexWrap,
	flexBasis,
	flexDirection,
	flex,
	justifySelf,
	alignSelf,
	order,
	gridGap,
	gridColumnGap,
	gridRowGap,
	gridColumn,
	gridRow,
	gridAutoFlow,
	gridAutoColumns,
	gridAutoRows,
	gridTemplateColumns,
	gridTemplateRows,
	gridTemplateAreas,
	gridArea,
	// borders
	border,
	borderTop,
	borderRight,
	borderBottom,
	borderLeft,
	borders,
	borderColor,
	borderRadius,
	boxShadow,
	opacity,
	overflow,
	background,
	backgroundImage,
	backgroundPosition,
	backgroundRepeat,
	backgroundSize,
	position,
	zIndex,
	top,
	right,
	bottom,
	left,
	textStyle,
	colorStyle,
	buttonStyle } from 'styled-system';


const Box = styled.div`
margin: initial;
padding: initial;
${space}
${width}
${cursor}
${fontSize}
${textColor}
${bgColor}
${color}
${fontFamily}
${textAlign}
${lineHeight}
line-height: 1;
${fontWeight}
${fontStyle}
${letterSpacing}
${display}
${maxWidth}
${minWidth}
${height}
${maxHeight}
${minHeight}
${sizeWidth}
${sizeHeight}
${size}
${ratioPadding}
${ratio}
${verticalAlign}
${alignItems}
${alignContent}
${justifyItems}
${justifyContent}
${flexWrap}
${flexBasis}
${flexDirection}
${flex}
${justifySelf}
${alignSelf}
${order}
${gridGap}
${gridColumnGap}
${gridRowGap}
${gridColumn}
${gridRow}
${gridAutoFlow}
${gridAutoColumns}
${gridAutoRows}
${gridTemplateColumns}
${gridTemplateRows}
${gridTemplateAreas}
${gridArea}
${borders}
${border}
${borderTop}
${borderRight}
${borderBottom}
${borderLeft}
${borders}
${borderColor}
${borderRadius}
${boxShadow}
${opacity}
${overflow}
${background}
${backgroundImage}
${backgroundPosition}
${backgroundRepeat}
${backgroundSize}
  position: ${(props) => props.position || 'initial'}
${zIndex}
${top}
${right}
${bottom}
${left}
${textStyle}
${colorStyle}
${buttonStyle}
  outline: ${(props) => props.outline || 'none'};
  display: ${(props) => {
		if (props.flex) {
			return 'flex';
		}
		if (props.inline) {
			return 'inline-block';
		}
		return 'block';
	}};
  justify-content: ${(props) => {
		if (props.between) {
			return 'space-between';
		}
		if (props.even) {
			return 'space-evenly';
		}
		if (props.center) {
			return 'center';
		}
		if (props.fstart) {
			return 'flex-start';
		}
		if (props.faround) {
			return 'space-around';
		}
		if (props.fend) {
			return 'flex-end';
		}
	}};
  align-items: ${(props) => {
		if (props.aic) {
			return 'center';
		}
		if (props.ais) {
			return 'flex-start';
		}
		if (props.aie) {
			return 'flex-end';
		}
		if (props.aib) {
			return 'baseline';
		}
		return 'flex-start';
	}
};
  flex-direction: ${(props) => {
		if (props.fdr) {
			return 'row';
		}
		if (props.fdc) {
			return 'column';
		}
	}};
  white-space: ${(props) => props.whiteSpace || 'normal'};
  transform: ${(props) => props.transform || 'none'};

    cursor: ${(props) => {
		if (props.pointer) {
			return 'pointer';
		}
		if (props.move) {
			return 'move';
		}
		return 'auto';
	}};


  &:hover {
    cursor: ${(props) => props.hover ? 'pointer' : 'auto'};
    background-color: ${(props) => props.hover ? (props.hoverColor || themeGet('colors.gray.10')) : (props.bg || props.background || props.bgColor)};
  }

box-sizing: ${(props) => props.boxSizing || 'initial'};
`;

Box.li = Box.withComponent('li');
Box.ul = Box.withComponent('ul');

export default Box;
