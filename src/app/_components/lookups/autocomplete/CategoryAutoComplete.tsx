import { useGetCategoryLookupListApi } from "@/utils/apis/shop/category/GET/categoryLookupListApi";
import Autocomplete, { AutocompleteProps } from "../../Autocomplete";

type CategoryAutoCompleteProps = Omit<AutocompleteProps, "options">;

const CategoryAutoComplete = (props: CategoryAutoCompleteProps) => {
  const categoryLookupQuery = useGetCategoryLookupListApi();

  return <Autocomplete options={categoryLookupQuery.data || []} {...props} />;
};
export default CategoryAutoComplete;
