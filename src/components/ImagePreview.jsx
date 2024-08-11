/* eslint-disable react/prop-types */

const ImagePreview = ({ imagePreview, classname, Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${classname} flex items-center justify-center  bg-zinc-300 rounded-lg overflow-hidden shadow-md shadow-zinc-400`}
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
