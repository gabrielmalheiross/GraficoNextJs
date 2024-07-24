'use client'

import { groupBy } from "@/utils/array";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type DadoApi = {
	y: string;
	dados: string;
	group: string;
};

type Serie = {
	name: string;
	data: number[];
};

const dadosApi: DadoApi[] = [
	{ y: '2011', dados: '0.2', group: 'Rendas' },
	{ y: '2012', dados: '0.3', group: 'Rendas' },
	{ y: '2011', dados: '0.43', group: 'Longevidade' },
	{ y: '2012', dados: '0.5', group: 'Longevidade' },
	{ y: '2011', dados: '0.70', group: 'Educação' },
	{ y: '2012', dados: '0.78', group: 'Educação' },
	{ y: '2011', dados: '0.8', group: 'IDHM' },
	{ y: '2012', dados: '0.8', group: 'IDHM' },
];

const Series: Serie[] = dadosApi.reduce((acc: Serie[], curr: DadoApi) => {
	const group = acc.find(item => item.name === curr.group);
	if (group) {
			group.data.push(parseFloat(curr.dados));
	} else {
			acc.push({ name: curr.group, data: [parseFloat(curr.dados)] });
	}
	return acc;
}, []);

const categoriesY = dadosApi.map(({ y }) => y)
const categoriesFormatada = categoriesY.filter((value,i) => categoriesY.indexOf(value) === i);
const dados = dadosApi.map(({ dados }) => dados)

const Options = {
	chart: {
		height: 350,
		type: 'line'
	},
	colors: ['#315825'],
	dataLabels: {
		enabled: true,
	},
	stroke: {
		curve: 'smooth'
	},
	title: {
		text: 'Percentual ()',
		align: 'left'
	},
	grid: {
		borderColor: '#e7e7e7',
		row: {
			colors: ['#f3f3f3', 'transparent'],
			opacity: 0.5
		},
	},
	markers: {
		size: 1
	},
	xaxis: {
		categories: categoriesFormatada,
		title: {
			text: 'Ano'
		}
	},
	yaxis: {
		title: {
			text: 'Percentual (%)'
		}
	},
	legend: {
		position: 'top',
		horizontalAlign: 'center',
		floating: true,
		offsetY: -25,
		offsetX: -5
	}
}

export default function Page() {
	return (
		<main style={{ backgroundColor: '#dadada' }}>
			<div className="column-7">
				<Chart type={"bar"} options={Options} series={Series} height={500} width={900} />
			</div>
		</main>
	)
}