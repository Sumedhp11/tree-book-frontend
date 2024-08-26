/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Applayout from "./layout/AppLayout";
import LoaderComponent from "./Loader";

const TreeKbPage = () => {
  const { name } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`kb-${name}`],
    queryFn: async () => {
      const res = await axios.get(
        `https://tree-book-backend.vercel.app/api/trees/getkb-by-name/${name}`
      );
      return res?.data;
    },
    retry: 0,
  });

  return isLoading ? (
    <LoaderComponent />
  ) : (
    <div className="w-full h-full flex justify-center">
      <div className="w-[75%] h-fit shadow shadow-gray-200 py-5 px-2">
        <h1 className="text-xl font-medium my-3">{name}</h1>

        {/* Tree Image */}
        <div className="w-full md:w-1/2 h-36">
          <img
            src={data?.data[0].tree_image}
            className="w-full h-full object-contain bg-gray-200 rounded-md"
            alt="tree-image"
          />
        </div>

        {/* Tree Information */}
        <div className="flex flex-col space-y-3">
          <div className="mt-4 flex flex-nowrap gap-1 items-center">
            <span className="font-medium text-sm">Common Name:</span>
            <span className="font-normal text-base">
              {data?.data[0].commonName}
            </span>
          </div>
          <div className="flex gap-1 flex-nowrap items-center">
            <span className="font-medium text-sm">Scientific Name:</span>
            <span className="font-normal text-base">
              {data?.data[0].scientificName}
            </span>
          </div>
          <div className="flex gap-1 flex-nowrap items-center">
            <span className="font-medium text-sm">Family:</span>
            <span className="font-normal text-base">
              {data?.data[0].family}
            </span>
          </div>
          <div className="flex gap-1 flex-nowrap items-center">
            <span className="font-medium text-sm">Availability:</span>
            <span className="font-normal text-base">
              {data?.data[0].availability}
            </span>
          </div>
        </div>

        {/* Uses */}
        <ul className="list-inside list-disc  mt-3 space-y-1">
          <p className="font-medium text-sm">Uses: </p>
          {data?.data[0].uses.map((use) => (
            <li key={use} className="font-normal text-base pl-3">
              {use}
            </li>
          ))}
        </ul>

        {/* Survival Conditions */}
        <ul className="list-inside list-disc  mt-3 space-y-1">
          <p className="font-medium text-sm">Survival Conditions:</p>
          {data?.data[0].survivalConditions.map((survivalCondition) => (
            <li key={survivalCondition} className="font-normal text-base pl-3">
              {survivalCondition}
            </li>
          ))}
        </ul>

        {/* Physical Characteristics */}
        <ul className="list-inside list-disc  mt-3 space-y-1">
          <p className="font-medium text-sm">Physical Characteristics:</p>
          {data?.data[0].physicalCharacteristics.map(
            (physicalCharacteristic) => (
              <li
                key={physicalCharacteristic}
                className="font-normal text-base pl-3"
              >
                {physicalCharacteristic}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Applayout(TreeKbPage);
