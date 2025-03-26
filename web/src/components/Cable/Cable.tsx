interface CableProps {
  id: string;
  className: string;
  imageSrc: string;
  isVisible: boolean;
  onClick: () => void;
}

const Cable: React.FC<CableProps> = ({
  id,
  className,
  imageSrc,
  isVisible,
  onClick,
}) => {
  return (
    <img
      id={id}
      className={className}
      src={imageSrc}
      style={{ visibility: isVisible ? "visible" : "hidden" }}
      onClick={onClick}
      alt="Cable"
    />
  );
};

export default Cable;
