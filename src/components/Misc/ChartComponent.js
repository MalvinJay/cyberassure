import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official"

const ChartComponent = ({ series }) => {
    const options = {
        chart: {
            type: 'line'
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
            name: '',
            data: [0, 5, 7, 6, 8, 2, 3],
            // lineWidth: 1,
            color: '#079669'
        }]       
    }

    return (
        <HighchartsReact 
            highcharts={Highcharts}
            options={options} 
            
        />
    )
}

export default ChartComponent