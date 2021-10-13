const presets = [
	[
		'@babel/preset-env',
		{
			targets: '>0.25%',
		},
	],
];

const plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'];

module.exports = { presets, plugins };
