import React from 'react';
import ChartistGraph from 'react-chartist';

const Bar = (props) => {
  const { statistics } = props;
  const { totalNumberOfAnswers, totalNumberOfEmployees } =  statistics;
	const labels = ['Total', 'Submitted'];
	const data = { series: [
    {
      value: parseInt(totalNumberOfEmployees) - parseInt(totalNumberOfAnswers),
      className: 'series-a'
    },
    {
      value: parseInt(totalNumberOfAnswers),
      className: 'series-b'
    }
    ] };
	const options = {
		width:'100%',
    height:'100%',
		labelInterpolationFnc: function(value, index) {
      if(index === 0) {
        value = totalNumberOfEmployees
      }
			return labels[index] + ' ' + value;
		}
	}
    const type = 'Pie'

    return (
      <div>
        <ChartistGraph data={data} options={options} type={type} />
      </div>
    )

}

export default React.memo(Bar);