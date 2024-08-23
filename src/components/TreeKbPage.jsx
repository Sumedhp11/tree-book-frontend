/* eslint-disable react-refresh/only-export-components */
import { useParams } from "react-router-dom"
import Applayout from "./layout/AppLayout"


const TreeKbPage = () => {
    const param = useParams()
    console.log(param)
    return (
        <div>

        </div>
    )
}

export default Applayout(TreeKbPage)