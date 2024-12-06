import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();
  
  const userLost = remainingTime <= 0;
  const formattedRemainingtime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  
  useImperativeHandle(ref, () => ({
      open() {
        dialog.current.showModal();
      },
  }));
  
  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost ? <h2>You lost</h2> : <h2>You won! Your score is {score}%</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingtime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
