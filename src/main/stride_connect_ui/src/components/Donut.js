import Chart from 'react-apexcharts'
import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
const Donut = ({pollOptions}) => {

    const [options, setOptions] = useState({
        series: [],
        labels: []
    });


    useEffect(() => {
        const tempOptions = {
            series: [],
            labels: [],
            legend: {
                position: 'bottom'
            }
        };

        pollOptions.forEach((option) => {
            tempOptions.series.push(option.votes);
            tempOptions.labels.push(option.text);
        })

        setOptions(tempOptions);
    }, [pollOptions])


    return (
        <Container className="d-flex flex-column align-items-center justify-content-center text-center mx-auto">
            <div className="donut">
                <Chart options={options} series={options.series} type="donut" width="380"/>
            </div>
        </Container>
    );
}

export default Donut;