import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

export function SearchForm () {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Buscar..." />
      <button type="submit">Buscar <MagnifyingGlass size={20}/> </button>
    </SearchFormContainer>
  )
}