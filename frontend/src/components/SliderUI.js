import React, { useContext, useState } from 'react'
import Slider from '@material-ui/core/Slider';
import { ItemsContext } from '../context/items/ItemsContext'
import { Button } from 'antd'

export const SliderUI = () => {

  const { min, max, currentMin, currentMax, setSlider, setCurrentPage } = useContext(ItemsContext)
  const [value, setValue] = useState([currentMin, currentMax]);

  const marks = [
    {
      value: min,
      label: `${min} рублей`,
    },
    {
      value: max,
      label: `${max} рублей`,
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  return (
    <div className="sliderui mb-4" style={{ width: '80%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <p style={{ fontSize: '1.2rem', fontWeight: '700' }} className="mb-4">Цена ОТ и ДО</p>
      <Slider
        valueLabelDisplay="auto"
        min={min}
        step={1000}
        max={max}
        value={value}
        onChange={handleChange}
        aria-labelledby="range-slider"
        marks={marks}
      />
      <Button
        onClick={() => {setSlider(value[0], value[1]); setCurrentPage(1)}}
      >Применить цену</Button>
    </div>
  )
}
