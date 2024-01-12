import React, { useState, useEffect } from 'react';
import 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import api from '../../util/api';

const ZipCodeChart = ({ zipcode, category }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const categories = {
      'Population': 'populationData',
      'Employment': 'employmentData',
      'Median Price': 'medianListingPriceData',
      'Active Listing': 'activeListeningCountData',
      'Days on Market': 'medianDaysOnMarketData',
      'New Listing': 'newListingCountData',
      'Price Reduced Count': 'priceReducedCountData',
      'Pending Listing Count': 'pendingListingCountData',
      'Total Listing': 'totalListingCount',
      'Median Gross Rent': 'medianGrossRent',
      'Median Income': 'medianIncome',
      'Cap Rate': 'capData'
    }

    // Fetch data from the API
    api.get(`/zipcode/${zipcode}?category=${categories[category]}`)
      .then((response) => {
        console.log("Res: ", response);
        const data = response.data;
        console.log("Data: ", data);

        // Extract years and populations from the API response
        const years = data?.map((item) => item.year);
        const populations = data?.map((item) => item.value);

        console.log('Populations: ', populations);

        // const years = []
        // const populations = []
        // Create chart data
        setChartData({
          labels: years,
          datasets: [
            {
              // label: category,
              data: populations,
              borderColor: '#9771B5',
              borderWidth: 2,
              // fill: false,
            },
          ],
        });
      })
      .catch((error) => {
        setChartData(null)
        console.error('Error fetching data:', error);
      });
  }, [zipcode, category]);

  return (
    chartData ? (
      <div>
        <h2 className='text-2xl ml-10 text-[#123447] font-bold'>{`${category}`} Chart for Zip Code {zipcode}</h2>
        <div>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {  // 'legend' now within object 'plugins {}'
                // legend: {
                //   labels: {
                //     color: "#9771B5",  // not 'fontColor:' anymore
                //     // fontSize: 18  // not 'fontSize:' anymore
                //     font: {
                //       size: 20 // 'size' now within object 'font {}'
                //     }
                //   }
                // }
                legend: {
                  display: false
                },
                tooltips: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return tooltipItem.yLabel;
                    }
                  }
                }
              },
              scales: {
                x: {
                  // title: {
                  //   display: true,
                  //   text: 'Year',
                  //   color: '#9771B5',
                  //   font: {
                  //     size: 25
                  //   }
                  // },
                  ticks: {
                    color: "black",  // not 'fontColor:' anymore
                    //fontSize: 14,
                    font: {
                      size: 14 // 'size' now within object 'font {}'
                    },
                    beginAtZero: true
                  }
                },
                y: {
                  // title: {
                  //   display: true,
                  //   text: `${category}`,
                  //   color: '#9771B5',
                  //   font: {
                  //     size: 25
                  //   }
                  // },
                  ticks: {
                    color: "black",
                    font: {
                      size: 14,
                    },
                    beginAtZero: true
                  }
                }
              },
            }}
          />
        </div>
      </div>
    ) : (
      <div className='prose lg:prose-xl'>
        <h1>Data Not Found</h1>
      </div>
    )
  );
};

export default ZipCodeChart;
