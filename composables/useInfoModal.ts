import type { infoModalData } from "~/types";

interface infoModalState {
  modalData: null | infoModalData;
  infoModalVisible?: boolean;
}

const state = reactive<infoModalState>({
  modalData: null,
  infoModalVisible: false,
});

export function useInfoModal() {
  const open = (data: infoModalData) => {
    if (!data) return;
    state.infoModalVisible = true;
    state.modalData = data;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    state.infoModalVisible = false;
    state.modalData = null;
    document.body.style.overflow = "";
  };

  return {
    ...toRefs(state),
    open,
    close,
  };
}
