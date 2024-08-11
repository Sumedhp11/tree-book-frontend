/* eslint-disable react/prop-types */

const ImagePreview = ({ imagePreview, classname, Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${classname} flex items-center justify-center border border-input  bg-gray-100 overflow-hidden shadow-lg shadow-gray-400`}
    >
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      ) : (
        <Icon size={55} className="text-primary cursor-pointer" />
      )}
    </div>
  );
};

export default ImagePreview;
