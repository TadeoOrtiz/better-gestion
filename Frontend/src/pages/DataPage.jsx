import { useCourseStore } from "../store/useCourseStore";

export default function DataPage() {
  const sendEvent = useCourseStore((state) => state.sendEvent);

  const handleClick = () => {
    sendEvent("Test", {
        timestamp: Date.now(),
        admin: "JASDKLASJD",
        soy: "El monte everest no tiene nada en contra de mi"
    });
  };

  return (
    <div>
      <button onClick={handleClick} className="hover:bg-amber-50">
        asdjlkasd
      </button>
    </div>
  );
}
