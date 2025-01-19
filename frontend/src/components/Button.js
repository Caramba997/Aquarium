import './Button.css';

export default function Button({ children, type, isLoading, size, onClick }) {

  return (
    <button className={`Button Button--${type}${size ? ' Button--' + size : ''}${isLoading ? ' is-loading' : ''}`} onClick={onClick || (() => {})}>
      <div className="Button--Content">
        { children }
      </div>
    </button>
  );
}