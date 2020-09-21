import React from 'react';

function SocialButton({ renderProps, btnProps }) {
  return (
    <button
      type="button"
      onClick={renderProps.onClick}
      disabled={
        renderProps.disabled ? renderProps.disabled : renderProps.isDisabled
      }
      className={`d-flex align-items-center ${btnProps.btnClass} justify-content-center btn btn-block my-3 font-weight-bold`}
      style={{ paddingTop: '13px', paddingBottom: '13px' }}
    >
      <img
        src={btnProps.icon}
        alt={btnProps.btnText}
        height="18"
        width="18"
        className="mr-2"
      />
      {btnProps.btnText}
    </button>
  );
}

export default SocialButton;
