/* eslint-disable react-hooks/rules-of-hooks */
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminAuthContext } from "../../layout/AdminAuthProvider";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../../ui/select";

export const KbBookColumn = [
    {
        accessorKey: "_id",
        header: "Sl No.",
        cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
        accessorKey: "request_type",
        header: "Tree Image",
        cell: ({ row }) => <img src={row.original.tree_image} alt="tree image" width="50" height="50" />

    },
    {
        accessorKey: "commonName",
        header: "Common Name",

    },
    {
        accessorKey: "scientificName",
        header: "Scientific Name",

    },
    {
        accessorKey: "family",
        header: "Family",
    },
    {
        accessorKey: "availability",
        header: "Availability",

    },
    {
        accessorKey: "",
        header: "Physical Characteristics",
        cell: ({ row }) => {
            return <div>
                {
                    row.original.physicalCharacteristics.map((e, index) => <p className="text-xs" key={index}>{e}</p>)
                }
            </div>
        },

    },
    {
        accessorKey: "",
        header: "Survival Conditions",
        cell: ({ row }) => {
            return <div>
                {
                    row.original.survivalConditions.map((e, index) => <p className="text-xs" key={index}>{e}</p>)
                }
            </div>
        },

    },
];
