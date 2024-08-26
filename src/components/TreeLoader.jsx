
import '../../src/components/TreeLoader.css'
import TreeIcon from "../assets/tree-svgrepo-com.svg"
const TreeLoader = () => {
    return <>
        <div className="flex items-center justify-center">
            <img src={TreeIcon} className={'stroke-yellow-600'} style={{ fill: 'yellow' }} />
        </div>
        {/* <div className="flex justify-center items-center">
            <svg
                width="100"
                height="150"
                viewBox="0 0 100 150"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="40"
                    y="100"
                    width="20"
                    height="50"
                    className="tree-trunk"
                />
           
                <circle
                    cx="50"
                    cy="70"
                    r="30"
                    className="tree-leaves"
                />
            </svg>
        </div> */}
    </>
}
    ;


export default TreeLoader