import StatisticsLine from "./StatisticsLine"

const Statistics = ({ stats }) => (
    stats[3].value === 0 ?
        <div>
            <p>No feedback given</p>
        </div>
        :
        <div>
            <table>
                <tbody>
                    <StatisticsLine text={stats[0].text} value={stats[0].value} />
                    <StatisticsLine text={stats[1].text} value={stats[1].value} />
                    <StatisticsLine text={stats[2].text} value={stats[2].value} />
                    <StatisticsLine text={stats[3].text} value={stats[3].value} />
                    <StatisticsLine text={stats[4].text} value={stats[4].value} />
                    <StatisticsLine text={stats[5].text} value={stats[5].value} />
                </tbody>
            </table>
        </div>
)

export default Statistics