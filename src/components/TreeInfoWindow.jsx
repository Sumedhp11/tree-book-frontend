/* eslint-disable react/prop-types */
const TreeInfoWindow = ({ tree }) => {
  return (
    <div className="w-36 flex flex-col space-y-1">
      <img
        src={tree?.tree_image}
        alt="tree-image"
        loading="lazy"
        className="w-full h-20 mb-4 object-contain"
      />
      <p className="text-sm font-medium ">Tree Name: {tree?.name}</p>
      <p className="text-sm font-normal">
        Tree Soil Type:
        {tree?.soil_type === "" ? "N/A" : tree.soil_type}
      </p>
      <p className="text-sm font-normal">
        Tree Age:
        {tree?.age === null ? "N/A" : tree.age}
      </p>
      <a
        target="_blank"
        className="text-blue-700 font-normal"
        href={tree.kb_link}
      >
        KB Link
      </a>
    </div>
  );
};

export default TreeInfoWindow;
