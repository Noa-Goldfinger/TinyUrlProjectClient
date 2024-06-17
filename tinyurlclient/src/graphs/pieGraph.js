import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ dictionary ,link }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!dictionary) {
            return; // אם המילון לא מוגדר, לא לעשות כלום
        }

        // פונקציה ליצירת צבעים אקראיים מחוץ ל useEffect
        const getRandomColors = (numColors) => {
            const colors = [];
            for (let i = 0; i < numColors; i++) {
                const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                colors.push(randomColor);
            }
            return colors;
        };

        console.log("---------------------------------------------------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(Object.keys(dictionary).length)
        console.log("---------------------------------------------------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        
        // let val=Object.keys(dictionary);
        // let names;
        // link.targetValues?.forEach(v=>{

        // })
            // link.targetValues.forEach(v => {
        //      setDictionary(prevDictionary => {
        //         let newDict = { ...prevDictionary };
        //         let newValue = prevDictionary[v.value];
        //         delete newDict[v.value];
        //         return { ...newDict, [v.name]: newValue };
        //     });
        // });
        
        const data = {
            labels: Object.keys(dictionary),
            datasets: [{
                label: 'Num clicks',
                data: Object.values(dictionary),
                backgroundColor: getRandomColors(Object.keys(dictionary).length), // קריאה לפונקציה מחוץ ל useEffect
                hoverOffset: 4
            }]
        };

        const config = {
            type: 'pie',
            data: data,
        };

        const ctx = chartRef.current.getContext('2d');

        // אם יש תרשים קיים ב-Canvas, השמידו אותו
        if (window.myChart !== undefined) {
            window.myChart.destroy();
        }

        // יצירת תרשים חדש
        window.myChart = new Chart(ctx, config);

        // חזרה על התנאי בסיום ה־useEffect
        return () => {
            if (window.myChart !== undefined) {
                window.myChart.destroy();
            }
        };
    }, [dictionary]);

    return (
        <div style={{ width: '800px' }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default ChartComponent;
