import ConfigPanel from "./components/ConfigPanel";
import { useState } from "react";

function App() {
    const [data, setData] = useState({});

    const dataReceived = (m) => {
        const data = JSON.parse(m);
        setData(data);
    };

    return (
        <div className="flex">
            <ConfigPanel onDataReceived={dataReceived} />
            <div className="h-10 w-10 bg-amber-200">{data.nombre}</div>
        </div>
    );
}

export default App;
