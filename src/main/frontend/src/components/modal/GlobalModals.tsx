import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ModalItem} from "../../store/modalSlice";
import FriendAddModal from "./FriendAddModal";
import ChatRoomAddModal from "./ChatRoomAddModal";
import EditMyProfileModal from "../settings/EditMyProfileModal";
import ConfirmEnterChatModal from "./ConfirmEnterChatModal";
import CommonConfirmModal from "./CommonConfirmModal";

const MODAL_COMPONENTS: { [key: string]: React.FC<any> } = {
    friend: FriendAddModal,
    chat: ChatRoomAddModal,
    editMyProfile: EditMyProfileModal,
    confirmEnterChat: ConfirmEnterChatModal,
    commonConfirm: CommonConfirmModal,
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