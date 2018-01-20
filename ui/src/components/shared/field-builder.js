import React, { PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import componentMap from './field-map';
import Children from '../fields/children';

import getTypeCheckedData from '../../util/data/get-typechecked-data';
import * as styleUtil from '../../util/dom/styles';

import styles from './field-builder.pcss';

/**
 * Assembles a group of fields by passed blueprint data fields object and returns them.
 *
 * @constructor
 */

const FieldBuilder = (props) => {
	const Fields = props.fields.map((field) => {
		const Field = componentMap[field.type.replace(/\\/g, '')];
		if (!Field) {
			return null;
		}

		let isActive = _.isEmpty(props.tabs);

		Object.keys(props.tabs).forEach((tab) => {
			if (props[tab].indexOf(field.name) >= 0 && tab === props.activeTab) {
				isActive = true;
			}
		});

		if (!isActive) {
			return null;
		}

		const classes = classNames({
			[styles.field]: true,
			[styles.compact]: styleUtil.isCompactField(field),
			'panel-input': true,
			[`input-name-${field.name.toLowerCase()}`]: true,
			[`input-type-${field.type.toLowerCase()}`]: true,
		});

		return (
			<div
				className={classes}
				key={_.uniqueId('field-id-')}
				style={styleUtil.fieldStyles(field)}
			>
				<Field
					{...field}
					depth={props.depth}
					panelIndex={props.index}
					parentIndex={props.parentIndex}
					indexMap={props.indexMap}
					parent={props.parent}
					panelLabel={props.label}
					liveEdit={props.liveEdit}
					tabs={props.tabs}
					activeTab={props.activeTab}
					data={getTypeCheckedData(field.type, props.data[field.name])}
					updatePanelData={props.updatePanelData}
					handleExpanderClick={props.handleExpanderClick}
					nestedGroupActive={props.nestedGroupActive}
					hidePanel={props.hidePanel}
				/>
			</div>
		);
	});

	const ChildPanels = props.hasChildren && props.activeTab === 'content_fields' ? (
		<Children
			childData={props.children}
			panels={props.panels}
			depth={props.depth}
			parentIndex={props.index}
			indexMap={props.indexMap}
			tabs={props.tabs}
			activeTab={props.activeTab}
			liveEdit={props.liveEdit}
			data={props.panels}
			updatePanelData={props.updatePanelData}
			handleExpanderClick={props.handleExpanderClick}
			nestedGroupActive={props.nestedGroupActive}
			hidePanel={props.hidePanel}
		/>
	) : null;

	return (
		<div>
			{Fields}
			{ChildPanels}
		</div>
	);
};

FieldBuilder.propTypes = {
	name: PropTypes.string,
	children: PropTypes.object,
	depth: PropTypes.number,
	index: PropTypes.number,
	indexMap: PropTypes.array,
	activeTab: PropTypes.string,
	label: PropTypes.string,
	parent: PropTypes.string,
	fields: PropTypes.array,
	panels: PropTypes.array,
	parentIndex: PropTypes.number,
	liveEdit: PropTypes.bool,
	hasChildren: PropTypes.bool,
	data: PropTypes.object,
	tabs: PropTypes.object,
	updatePanelData: PropTypes.func,
	settings_fields: React.PropTypes.array,
	hidePanel: PropTypes.func,
	nestedGroupActive: PropTypes.func,
	handleExpanderClick: PropTypes.func,
};

FieldBuilder.defaultProps = {
	name: '',
	children: {},
	depth: 0,
	index: 0,
	indexMap: [],
	activeTab: 'content_fields',
	label: '',
	fields: [],
	panels: [],
	parent: '',
	parentIndex: 0,
	liveEdit: false,
	hasChildren: false,
	data: {},
	tabs: {},
	settings_fields: [],
	updatePanelData: () => {},
	hidePanel: () => {},
	nestedGroupActive: () => {},
	handleExpanderClick: () => {},
};

export default FieldBuilder;
