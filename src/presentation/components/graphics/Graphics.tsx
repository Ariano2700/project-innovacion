import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphicsChartJs = () => {

    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
            'Junio', 'Julio', 'Agosto', 'Septiembre',
            'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
            label: 'Control de tus gastos',
            data: [12, 19, 3, 5, 2, 3, 8,9,14,6,20,12],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderWidth: 2,
        }]
    };


    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                grid: {   //valores en el eje x
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Meses',
                    font: {
                        size: 20,
                    },
                    color: 'red'
                },
            },
            y: {
                beginAtZero: true, // valores en el eje y
                grid: {
                    color: '#e2e8f0',
                },
                title: {
                    display: true,
                    text: 'Dinero',
                    font: {
                        size: 20,
                    },
                    color: 'blue'
                },
                ticks: {
                    callback: function (value: any) {
                        return '$' + value;
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,  //para el label pricipal del grafico
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                    },
                    color: '#4a5568',
                },
            },
            tooltip: {
                enabled: true,  //para valores dentro de la grafica
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `$${tooltipItem.raw} gastos`;
                    },
                },
            },
        },
        elements: {
            line: {
                tension: 0.4,
                borderColor: '#3182ce',
                borderWidth: 2,
            },
            point: {
                radius: 6,
                backgroundColor: '#3182ce',
                hoverRadius: 7,
            },
        },
    };

    return (
        <div className='h-96' >
            <Line data={data} options={options} />
        </div>
    );
};

export default GraphicsChartJs;