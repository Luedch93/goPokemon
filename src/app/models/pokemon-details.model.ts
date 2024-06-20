import { PokemonDetailsResponse } from "../types/PokemonDetailsResponse";

export const emptyDetails = (): PokemonDetailsResponse => ({
  base_experience: 0,
  cries: {
    latest: "",
    legacy: "",
  },
  height: 0,
  id: 0,
  is_default: false,
  location_area_encounters: "",
  name: "",
  order: 0,
  sprites: {
    back_default: "",
    back_female: "",
    back_shiny: "",
    back_shiny_female: "",
    front_default: "",
    front_female: "",
    front_shiny: "",
    front_shiny_female: "",
  },
  stats: [],
  types: [],
  weight: 0,
});
