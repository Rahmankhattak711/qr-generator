import React from 'react'

interface roundedBallProps{
  width?:string,
  height?:string,
  bgColor?:string
}

export default function RoundedBall({width, height,bgColor}:roundedBallProps) {
  return (
    <div className={`w-72 h-72 ${width} ${height} bg-[#7A4B68] ${bgColor} rounded-full`}></div>
  )
}
