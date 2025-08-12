import { useGetBrandLookupList } from "@/utils/apis/brand/GET/brandLookupListApi";
import Autocomplete, { AutocompleteProps } from "../../Autocomplete";

type BrandAutoCompleteProps = Omit<AutocompleteProps, "options">;

const BrandAutoComplete = (props: BrandAutoCompleteProps) => {
  const brandLookupQuery = useGetBrandLookupList();

  return <Autocomplete options={brandLookupQuery.data || []} {...props} />;
};
export default BrandAutoComplete;
