import React from 'react'
import Slider from '@material-ui/core/Slider';

export const SliderUI = () => {

    const [value, setValue] = React.useState([0, 20000]);

    const marks = [
        {
          value: 0,
          label: '0 рублей',
        },
        {
          value: 20000,
          label: '20 тыс. рублей',
        },
      ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="sliderui mb-4" style={{width: '80%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <p style={{fontSize: '1.2rem', fontWeight: '700'}} className="mb-4">Цена ОТ и ДО</p>
            <Slider
                valueLabelDisplay="on"
                min={0}
                step={100}
                max={20000}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                marks={marks}
            />
        </div>
    )
}
