import { Slider } from "@/components/ui/slider";
import { useOpacitySlider } from "@/hooks/use-opacity-slider";

function App() {
	const { opacity, handleOnValueChange } = useOpacitySlider();

	return (
		<div className="relative">
			<div style={{ opacity }}>
				<div className="bg-white h-screen">hello</div>
			</div>
			<div className="fixed bottom-4 w-48 left-1/2 -translate-x-1/2">
				<Slider
					defaultValue={[100]}
					max={100}
					step={1}
					onValueChange={(values) => {
						handleOnValueChange(values[0]);
					}}
				/>
			</div>
		</div>
	);
}

export default App;
