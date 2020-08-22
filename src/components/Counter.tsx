import React from 'react'
import styled from 'styled-components'

const CounterPlaceholder = styled.div`
 opacity: 0.3;
`

const CounterDisplay = styled.div`
 position: absolute;
 top:0;
`

const CounterWrapper = styled.div`
position: relative;
font-family: "seven-segment";
font-size: 24px;
font-weight:bold;
color:red;
background-color:black;
`

interface Props extends React.Props<never>{
    value: number,
    size: number
}

export default function Counter({value, size}: Props){
    return(
        <CounterWrapper>
        <CounterPlaceholder>{''.padStart(size,'8')}</CounterPlaceholder>
        <CounterDisplay>{`${value}`.padStart(size,'!')}</CounterDisplay>
        </CounterWrapper>
    )
}