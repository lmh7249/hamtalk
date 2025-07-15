import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ModalItem} from "../../store/modalSlice";
import FriendAddModal from "../friends/FriendAddModal";
import ChatRoomAddModal from "./ChatRoomAddModal";
import EditMyProfileModal from "../settings/EditMyProfileModal";

const MODAL_COMPONENTS: { [key: string]: React.FC<any> } = {
    friend: FriendAddModal,
    chat: ChatRoomAddModal,
    editMyProfile: EditMyProfileModal,
    // confirmEnterChat: ConfirmEnterChatModal, // 나중에 추가
};

const GlobalModals = () => {
    const {modals} = useSelector((state:RootState) => state.modal);

    return (
        <>
            {modals.map((modal: ModalItem, index: number) => {
                const ModalComponent = MODAL_COMPONENTS[modal.type];
                if(!ModalComponent) {
                    return null;
                }
                return <ModalComponent key={index} {...modal.props} />;
            })}
        </>
    )
}

export default GlobalModals;