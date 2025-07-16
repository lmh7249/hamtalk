import styled from "styled-components";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {closeModal} from "../../store/modalSlice";
import BaseModal from "../common/BaseModal";

interface CommonConfirmModalProps {
    title: string;
    children: React.ReactNode;
    confirmText: string;
    onConfirm: () => void;
    cancelText?: string;
    onCancel?: () => void;
}

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
`;

const Title = styled.h3`
    margin-top: 0;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: baseline;
    gap: 5px;
`;

// 모든 버튼의 기본 스타일 (공통)
const BaseButton = styled.button`
    width: 100%;
    padding: 10px 0;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s ease; /* 부드러운 색상 변경 효과 */
`;

const PrimaryButton = styled(BaseButton)`
    background-color: #FFCE00; // 햄톡의 메인 컬러(예시)

    &:hover {
        background-color: #e6ba00;
    }

`;
const SecondaryButton = styled(BaseButton)`
    background-color: #e9e9eb;
    color: #333;

    &:hover {
        background-color: #dcdce0;
    }
`;

const ContentWrapper = styled.div`
    padding: 20px 5px;
`;

const CommonConfirmModal = ({
                                title,
                                children,
                                confirmText,
                                onConfirm,
                                cancelText = '취소', // 기본값 설정
                                onCancel,
                            }: CommonConfirmModalProps) => {
    const dispatch = useDispatch();


    // BaseModal x 클릭 시, 해당 모달만 닫기.
    const handleClose = useCallback(() => {
        dispatch(closeModal());
    }, [dispatch]);

    const handleCancel = useCallback(() => {
        if (onCancel) {
            onCancel();
        } else {
            handleClose();
        }
    }, [onCancel, handleClose]);

    return (
        <BaseModal width="320px" height="auto" modalClose={handleClose}>
            <TitleWrapper>
                <Title>{title}</Title>
            </TitleWrapper>
            <ContentWrapper>
                {children}
            </ContentWrapper>
            <ButtonWrapper>
                <PrimaryButton onClick={onConfirm}>{confirmText}</PrimaryButton>
                <SecondaryButton onClick={handleCancel}>{cancelText}</SecondaryButton>
            </ButtonWrapper>
        </BaseModal>
    );
};

export default CommonConfirmModal;