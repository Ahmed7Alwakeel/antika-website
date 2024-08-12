import { Label } from "../../components/ui/label";
import { Check } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
    onChange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    cuisinesList: string[];
};

const CategoryFilter = ({
    onChange,
    selectedCuisines,
    cuisinesList
}: Props) => {
    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCuisine = event.target.value;
        const isChecked = event.target.checked;

        const newCuisinesList = isChecked
            ? [...selectedCuisines, clickedCuisine]
            : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

        onChange(newCuisinesList);
    };

    const handleCuisinesReset = () => onChange([]);

    return (
        <>
            <div className="flex justify-between items-center px-2 w-fit">
                <div className="text-md font-semibold mb-2 mr-2">Filter By Category</div>
                <div
                    onClick={handleCuisinesReset}
                    className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
                >
                    Reset Filters
                </div>
            </div>

            <div className="space-y-2 flex flex-col">
                {cuisinesList?.map((cuisine: string) => {
                    const isSelected = selectedCuisines.includes(cuisine);
                    return (
                        <div className="flex w-20 capitalize" key={cuisine}>
                            <input
                                id={`cuisine_${cuisine}`}
                                type="checkbox"
                                className="hidden"
                                value={cuisine}
                                checked={isSelected}
                                onChange={handleCuisinesChange}
                            />
                            <Label
                                htmlFor={`cuisine_${cuisine}`}
                                className={`min-w-28 flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected
                                    ? "border border-green-600 text-green-600"
                                    : "border border-slate-300"
                                    }`}
                            >
                                {isSelected && <Check size={20} strokeWidth={3} />}
                                {cuisine}
                            </Label>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default CategoryFilter;