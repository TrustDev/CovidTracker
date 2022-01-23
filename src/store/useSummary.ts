import create, {GetState, SetState} from 'zustand'
import { devtools } from 'zustand/middleware'
import { CountryCaseModel, GlobalSummaryModel, GlobalAndCountrySummary } from '../model/covidModel'

interface SummaryState {
    globalSummary: GlobalSummaryModel|null,
    countryCases: CountryCaseModel[]|null,
    setGlobalSummary: (value: GlobalSummaryModel) => void,
    setCountryCases: (value: CountryCaseModel[]) => void,
    setGlobalAndCountrySummary: (value: GlobalAndCountrySummary) => void,
}
  
const useSummaryStore = create<SummaryState>((set, get) => ({
    globalSummary: null,
    countryCases: null,
    setGlobalSummary: (value) => set({
        globalSummary: value
    }),
    setCountryCases: (value) => set({
        countryCases: value
    }),
    setGlobalAndCountrySummary: (value) => set({
        globalSummary: value.global,
        countryCases: value.countryCases
    })
}))

export default useSummaryStore
  