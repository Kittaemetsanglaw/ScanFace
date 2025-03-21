import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, TimeScale } from "chart.js";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { WebSocketContext } from "../../services/WebSocketProvider.jsx";
import zoomPlugin from "chartjs-plugin-zoom";
import axios from "axios";

Chart.register(CategoryScale, TimeScale, zoomPlugin);

const MAX_DATA_POINTS = 200; // จำนวนข้อมูลสูงสุดที่จะแสดงในกราฟ

const ChartComponent = ({ isDataRunning, toggleData }) => {
  const { data, isConnected, sendDateRange } = useContext(WebSocketContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Power Consumption",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0,
      },
      {
        label: "Pressure",
        data: [],
        borderColor: "rgb(153, 102, 255)",
        tension: 0,
      },
      {
        label: "Force",
        data: [],
        borderColor: "rgb(255, 159, 64)",
        tension: 0,
      },
      {
        label: "Position of the Punch",
        data: [],
        borderColor: "rgb(0, 0, 255)",
        tension: 0,
      },
    ],
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resetTrigger, setResetTrigger] = useState(false); //ประกาศ state สำหรับ reset

  // ดึงข้อมูลย้อนหลังตามช่วงวันที่เลือก
  const fetchHistoricalData = async () => {
    if (startDate && endDate) {
      try {
        const response = await axios.get(`/api/data`, {
          params: {
            start: startDate,
            end: endDate,
          },
        });
        const historicalData = response.data;

        // จัดรูปแบบข้อมูลที่ได้จาก API ให้ตรงกับรูปแบบที่กราฟต้องการ
        const newChartData = {
          labels: historicalData.map((point) => new Date(point.timestamp || new Date())),
          datasets: [
            {
              label: "Power Consumption",
              data: historicalData.map((point) => point["Energy Consumption"].Power),
              borderColor: "rgb(75, 192, 192)",
            },
            {
              label: "Pressure",
              data: historicalData.map((point) => point.Pressure),
              borderColor: "rgb(153, 102, 255)",
            },
            {
              label: "Force",
              data: historicalData.map((point) => point.Force),
              borderColor: "rgb(255, 159, 64)",
            },
            {
              label: "Position of the Punch",
              data: historicalData.map((point) => point["Position of the Punch"]),
              borderColor: "rgb(0, 0, 255)",
            },
          ],
        };

        setChartData(newChartData);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    }
  };

  // เรียก fetchHistoricalData เมื่อ startDate หรือ endDate เปลี่ยนแปลง
  useEffect(() => {
    if (startDate && endDate) {
      fetchHistoricalData();
      sendDateRange(startDate, endDate); // ส่งข้อมูลวันเริ่มต้นและวันสิ้นสุดไปยังเซิร์ฟเวอร์
    }
  }, [startDate, endDate, sendDateRange]);

  // รีเซ็ตกราฟเมื่อข้อมูลถึงจำนวนสูงสุดที่กำหนด
  useEffect(() => {
    if (data && isDataRunning) {
      setChartData((prevData) => {
        const newTimestamp = new Date(); // ใช้ Date object สำหรับ timestamp
        const newChartData = {
          labels: [...prevData.labels, newTimestamp], // เพิ่ม timestamp ใหม่เข้าไปใน labels
          datasets: prevData.datasets.map((dataset, index) => {
            let newDataPoint;
            switch (index) {
              case 0:
                newDataPoint = data["Energy Consumption"].Power;
                break;
              case 1:
                newDataPoint = data.Pressure;
                break;
              case 2:
                newDataPoint = data.Force;
                break;
              case 3:
                newDataPoint = data["Position of the Punch"];
                break;
              default:
                newDataPoint = null;
            }

            const updatedData = [...dataset.data, newDataPoint].slice(-MAX_DATA_POINTS);
            return {
              ...dataset,
              data: updatedData,
            };

          }),
        };

        newChartData.labels = [...newChartData.labels].slice(-MAX_DATA_POINTS);

        if (newChartData.labels.length >= MAX_DATA_POINTS) {
          // เคลียร์กราฟ
          newChartData.labels = [];
          newChartData.datasets.forEach(dataset => {
            dataset.data = [];
          });
        }

        return newChartData;
      });
    }
    // ตรวจสอบเงื่อนไข resetTrigger *นอก* if block ของการอัพเดตข้อมูล
    if (resetTrigger) {
      setChartData({
        labels: [],
        datasets: [
          {
            label: "Power Consumption",
            data: [],
            borderColor: "rgb(75, 192, 192)",
            tension: 0,
          },
          {
            label: "Pressure",
            data: [],
            borderColor: "rgb(153, 102, 255)",
            tension: 0,
          },
          {
            label: "Force",
            data: [],
            borderColor: "rgb(255, 159, 64)",
            tension: 0,
          },
          {
            label: "Position of the Punch",
            data: [],
            borderColor: "rgb(0, 0, 255)",
            tension: 0,
          },
        ]
      });
      setResetTrigger(false);
    }
  }, [data, isDataRunning, resetTrigger]);




  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second", // สามารถปรับเป็น "minute", "hour", "day" ตามต้องการ
          tooltipFormat: "dd/MM/yyyy HH:mm:ss",
        },
        title: {
          display: true,
          text: "Timestamp",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
  };

  const handleToggleData = () => {
    toggleData(!isDataRunning); // สลับสถานะการแสดงผลข้อมูล
  };

  return (
    <div className="w-full p-4">
      <div className="date-picker">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ backgroundColor: "lightblue", color: "darkblue" }}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ backgroundColor: "lightcoral", color: "darkred" }}
          />
        </label>
        <button onClick={fetchHistoricalData} className="mt-4 p-0.5 bg-blue-500 text-white rounded">
          Fetch Data
        </button>
      </div>

      {!isConnected && (
        <div className="text-red-500 font-bold mb-4">
          Disconnected. Attempting to reconnect...
        </div>
      )}
      {isConnected && (
        <div className="text-green-500 font-bold mb-4">
          Connected to WebSocket!
        </div>
      )}
      <Line data={chartData} options={options} />

      <button
        onClick={handleToggleData}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        {isDataRunning ? 'Stop Plotting' : 'Start Plotting'}
      </button>
      <button onClick={() => setResetTrigger(true)} className="mt-4 ml-10 pr- p-2 bg-blue-500 text-white rounded">
        Reset Chart
      </button>
    </div>
  );
};

export default ChartComponent;