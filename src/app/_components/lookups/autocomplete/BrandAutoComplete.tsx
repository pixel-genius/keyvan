import { useGetBrandLookupListApi } from "@/utils/apis/shop/brand/GET/brandLookupListApi";
import Autocomplete, { AutocompleteProps } from "../../Autocomplete";

type BrandAutoCompleteProps = Omit<AutocompleteProps, "options">;

const BrandAutoComplete = (props: BrandAutoCompleteProps) => {
  const brandLookupQuery = useGetBrandLookupListApi();

  return <Autocomplete options={brandLookupQuery.data || []} {...props} />;
};
export default BrandAutoComplete;
