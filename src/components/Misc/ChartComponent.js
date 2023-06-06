import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official"

const ChartComponent = ({ series }) => {
    const options = {
        chart: {
            type: 'line',
            height: '200px'
        },
        title: {
            text: ''
        },
    
        xAxis: {
            tickInterval: 1,
            type: 'Total'
        },
    
        yAxis: {
            type: 'Month'
        },
    
        // tooltip: {
        //     headerFormat: '<b>{series.name}</b><br />',
        //     pointFormat: 'x = {point.x}, y = {point.y}'
        // },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Months',
            data: [15, 35, 48, 30, 65, 62, 90],
            // lineWidth: 1,
            color: '#079669'
        }],
        style: {
            height: '20rem'
        }   
    }

    return (
        <HighchartsReact 
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default ChartComponent