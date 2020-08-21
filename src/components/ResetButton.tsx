import React from 'react'
import styled from 'styled-components'
import SquareButton from './SquareButton';

interface Props extends React.Props<never> {
    state: '🙂' | '😨'
    onClick: () => void
}

const ButtonWrapper = styled.div`display:flex`

export default function ResetButton({
    state, onClick
}: Props) {
    return (
        <ButtonWrapper><SquareButton onClick={onClick} style={{ flex: '0 0 auto', width: "24px" }}>{state}</SquareButton></ButtonWrapper>
    )
}

ResetButton.defaultProps = {
    state: '🙂',
    onClick: undefined
};
