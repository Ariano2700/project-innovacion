import "./ToggleGraphics.css";
interface ToggleGraphicsI {
  setIsChecked: () => void;
  isChecked: boolean;
}
const ToggleGraphics = (props: ToggleGraphicsI) => {
  const { setIsChecked, isChecked } = props;
  return (
    <div className="switch-holder">
      <div className="switch-label">
        <i className="fa fa-bluetooth-b"></i>
        <span>Grafico de lineas</span>
      </div>
      <div className="switch-toggle">
        <input
          onClick={() => setIsChecked()}
          checked={isChecked}
          type="checkbox"
          id="bluetooth"
        />
        <label htmlFor="bluetooth"></label>
      </div>
    </div>
  );
};
export default ToggleGraphics;
