import moment from "moment";

export const columns = [
  {
    accessorKey: "id",
    header: "Sl No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "tree_image",
    header: "Tree Image",
    cell: ({ row }) => (
      <div className="w-20  h-20">
        <img
          src={row.original.tree_image}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Tree Name",
  },
  {
    accessorKey: "soil_type",
    header: "Soil Type",
  },
  {
    accessorKey: "age",
    header: "Tree Age",
  },
  {
    accessorKey: "added_by",
    header: "Added By",
  },
  {
    accessorKey: "createdAt",
    header: "Added Date Time",
    cell: ({ row }) => (
      <div className="flex flex-col gap-3 items-center">
        <p>{moment(row.original.createdAt).format("DD-MM-YYYY")}</p>
        <p>{moment(row.original.createdAt).format("HH:MM")}</p>
        <p></p>
      </div>
    ),
  },
];
