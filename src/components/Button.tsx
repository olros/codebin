export const BUTTON_CLASSES = 'm-2 flex-1 px-4 rounded-lg text-white text-center truncate bg-green-700 hover:bg-green-800 active:bg-green-900 h-10 leading-10';
export const BUTTON_STYLE: React.CSSProperties = { minWidth: '120px' };

const Button = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
  <button className={`${BUTTON_CLASSES} ${props.className ? props.className : ''}`} style={BUTTON_STYLE} {...props}>
    {props.children}
  </button>
);

export default Button;
