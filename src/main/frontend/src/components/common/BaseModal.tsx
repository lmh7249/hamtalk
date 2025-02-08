import styled from "styled-components";
import CloseIcon from "../../assets/icons/close-icon.svg";
import React from "react";
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalContainer = styled.div<{width: string, height: string}>`
    width: ${({width}) => width};
    height: ${({height}) => height};
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    min-width: 300px;
`

const CloseButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;
    position: absolute;
    right: 10px;
    top: 10px;
`

interface BaseModalProps {
    children: React.ReactNode;
    width?: string;
    height?: string;
    modalClose: ()=>void;
}

const BaseModal = ({children, width = "300px", height = "auto", modalClose}:BaseModalProps) => {
    return (
        <Overlay>
            <ModalContainer width={width} height={height}>
                <CloseButton>
                    <img src={CloseIcon} alt="닫기" width={20} height={20} onClick={modalClose}/>
                </CloseButton>
                {children}
            </ModalContainer>
        </Overlay>
    )
}

export default BaseModal