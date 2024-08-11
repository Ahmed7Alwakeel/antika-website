
import SearchResultInfo from "./SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../../modules/restaurant/api/API";
import SearchResultCard from "../../modules/search/components/SearchResultCard";
import { Restaurant } from "../../modules/restaurant/types/types";
import PaginationSelector from "./PaginationSelector";
import SearchBar, { SearchForm } from "./SearchBar";
import SortOptionDropdown from "./SortOptionDropdown";
import CategoryFilter from "./CategoryFilter";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
};

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { results, isLoading } = useSearchRestaurants(searchState, city);

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1,
        }));
    };

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }));
    };
    

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }));
    };

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    };

    // if (isLoading) {
    //     <span>Loading ...</span>;
    // }

    // if (!results?.data || !city) {
    //     return <span>No results found</span>;
    // }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CategoryFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() =>
                        setIsExpanded((prevIsExpanded) => !prevIsExpanded)
                    }
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeHolder="Search by Cuisine or Restaurant Name"
                    onReset={resetSearch}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results.metaData.results} city={city} />
                    <SortOptionDropdown
                        sortOption={searchState.sortOption}
                        onChange={(value: string) => setSortOption(value)}
                    />
                </div>

                {results.data.data.map((restaurant: Restaurant) => (
                    <SearchResultCard restaurant={restaurant} />
                ))}
                {results.metaData.no_of_pages > 1 &&
                    <PaginationSelector
                        page={results.metaData.page}
                        pages={results.metaData.no_of_pages}
                        onPageChange={setPage}
                    />
                }
            </div>
        </div>
    );
};

export default SearchPage;
