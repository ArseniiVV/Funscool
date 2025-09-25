
interface videoModalState {
  isVisible: boolean
  videoSrc?: string
}

const state = reactive<videoModalState>({
  isVisible: false,
  videoSrc: ""
});

export function useVideoModal() {
  const open = (src: string) => {
    if(!src) return;
    state.videoSrc = src;
    state.isVisible = true;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    state.isVisible = false;
    document.body.style.overflow = "";
  };

  return {
    ...toRefs(state),
    open,
    close
  };
}