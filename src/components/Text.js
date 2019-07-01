import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { style, borderBottom, color, space } from 'styled-system';
import { Text as Base } from 'rebass';

const textDecoration = style({
	prop: 'textDecoration',
	cssProperty: 'textDecoration',
});

const cursor = style({
	prop: 'cursor',
	cssProperty: 'cursor',
});

const lineHeight = style({
	// React prop name
	prop: 'lineHeight',
	// The corresponding CSS property (defaults to prop argument)
	cssProperty: 'lineHeight',
	// key for theme values
	key: 'lineHeights',
	// accessor function for transforming the value
	transformValue: (n) => `${n}px`,
	// add a fallback scale object or array, if theme is not present
	scale: [0, 4, 8, 16, 32],
});

const Text = styled(Base)`
${lineHeight}
${cursor}
${textDecoration}
${space}
`;


Text.displayName = 'Text';
Text.span = Text.withComponent('span');
Text.p = Text.withComponent('p');
Text.s = Text.withComponent('s');

class Typestyle extends Component {
	constructor (props) {
		super(props);
		this.state = { };
	}


	render () {
		let size = 14;
		let color = this.props.color || 'black';
		let height = 20;
		let weight = 'regular';
		let family = 'Toybox Helvetica Normal';
		const bold = 'Toybox Helvetica Bold';
		const light = 'Toybox Helvetica Light';
		const normal = family;

		let textTransform = 'none';
		let cursorType = 'inherit';

		if (this.props.large) {
			size = 32;
			height = 48;
			weight = bold;
			family = bold;
		}
		if (this.props.medium) {
			size = 24;
			height = 36;
			family = bold;
		}
		if (this.props.small) {
			size = 16;
			height = 24;
			weight = normal;
		}
		if (this.props.caption) {
			height = 16;
			size = 12;
			weight = normal;
		}
		if (this.props.subheading) {
			size = 11;
			height = 14;
			textTransform = 'uppercase';
			family = bold;
		}

		if (this.props.subdued) {
			color = 'gray.30';
		}
		if (this.props.disabled) {
			color = 'gray.25';
		}
		if (this.props.reversed) {
			color = 'white';
		}

		if (this.props.success) {
			color = 'green.darken';
		}
		if (this.props.warning) {
			color = 'red.primary';
		}
		if (this.props.hyperlink) {
			color = 'blue.primary';
			cursorType = 'pointer';
		}

		if (this.props.bold) {
			family = bold;
		}
		if (this.props.light) {
			family = light;
		}
		if (this.props.regular) {
			weight = 'regular';
		}


		if (this.props.pointer) {
			cursorType = 'pointer';
		}
		if (this.props.xs) {
			size = 10;
			height = 12;
		}

		return <Text color={color} cursor={cursorType} fontSize={size} {...this.props} css={{ textTransform, ...this.props.css }} lineHeight={height} fontWeight={weight} fontFamily={family}>{this.props.children}</Text>;
	}
}
export default Typestyle;
