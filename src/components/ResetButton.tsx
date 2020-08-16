import React from 'react'
import styled from 'styled-components'


const Pepon = styled.button`
    margin:0;
    padding:0;
    border:1px outset;
    border-radius:0;
    background-color:darkgray;
    height:24px;
    width:24px;
`

interface Props extends React.Props<never> {
    state: '🙂' | '😨'
    onClick: () => void
}

export default function ResetButton({
    state, onClick
}: Props) {
    return (
        <Pepon onClick={onClick}>{state}</Pepon>
    )
}

ResetButton.defaultProps = {
    state: '🙂',
    onClick: undefined
};
