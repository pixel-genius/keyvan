import { useGetCategoryLookupList } from "@/utils/apis/category/GET/categoryLookupListApi";
import Autocomplete, { AutocompleteProps } from "../../Autocomplete";

type CategoryAutoCompleteProps = Omit<AutocompleteProps, "options">;

const CategoryAutoComplete = (props: CategoryAutoCompleteProps) => {
  const categoryLookupQuery = useGetCategoryLookupList();

  return <Autocomplete options={categoryLookupQuery.data || []} {...props} />;
};
export default CategoryAutoComplete;
