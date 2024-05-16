import { Component } from 'react'
import { MetricsTable, MonthlyMetricsChart } from './'

export class Dashboard extends Component {
    render() {
    return (
        <>
            <MetricsTable />
            <MonthlyMetricsChart />
        </>
    )
}
}

