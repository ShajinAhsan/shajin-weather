import "../styles/Divider.css";
export const Divider = ({ children, ...rest }) => {
  return (
    <div className="divider__container">
      <div className="divider__border" />
      <span {...rest}>{children}</span>
      <div className="divider__border" />
    </div>
  );
};
