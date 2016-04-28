<?php

namespace ModularContent\Fields;

use Codeception\TestCase\WPTestCase;

class Repeater_Test extends WPTestCase {
	public function test_blueprint() {
		$label = __CLASS__ . '::' . __FUNCTION__;
		$name = __FUNCTION__;
		$description = __FUNCTION__ . ':' . __LINE__;
		$group = new Repeater( [
			'label'       => $label,
			'name'        => $name,
			'description' => $description,
			'min'         => 1,
			'max'         => 6,
			'strings'     => [
				'button.new' => 'Add Another',
			],
		] );

		$group->add_field( new Text( [
			'label'       => $label . '1',
			'name'        => $name . '1',
			'description' => $description . '1',
		] ) );

		$group->add_field( new Text( [
			'label'       => $label . '2',
			'name'        => $name . '2',
			'description' => $description . '2',
		] ) );

		$blueprint = $group->get_blueprint();

		$expected = [
			'type'        => 'ModularContent\Fields\Repeater',
			'label'       => $label,
			'name'        => $name,
			'description' => $description,
			'strings'     => [
				'button.new' => 'Add Another',
			],
			'default'     => [ ],
			'fields'      => [
				[
					'type'        => 'ModularContent\Fields\Text',
					'label'       => $label . '1',
					'name'        => $name . '1',
					'description' => $description . '1',
					'strings'     => [ ],
					'default'     => '',
				],
				[
					'type'        => 'ModularContent\Fields\Text',
					'label'       => $label . '2',
					'name'        => $name . '2',
					'description' => $description . '2',
					'strings'     => [ ],
					'default'     => '',
				],
			],
			'min'         => 1,
			'max'         => 6,
		];

		$this->assertEquals( $expected, $blueprint );
	}
}