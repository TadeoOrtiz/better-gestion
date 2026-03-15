import ConfigPanel from "./components/ConfigPanel";
import FlowContent from "./components/Flow/Flow";
import { FlowProvider } from "./components/Flow/FlowProvider";

function App() {
  return (
    <FlowProvider>
      <div className="flex h-full overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <FlowContent />
        </div>
        <ConfigPanel />
      </div>
    </FlowProvider>
  );
}

export default App;
