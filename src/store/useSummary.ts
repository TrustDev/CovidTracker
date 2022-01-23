import create, {GetState, SetState} from 'zustand'
import { devtools } from 'zustand/middleware'
import { CountryCaseModel, GlobalSummaryModel, GlobalAndCountrySummary, CaseType, CountryModel } from '../model/covidModel'

interface SummaryState {
    globalSummary: GlobalSummaryModel|null,
    countryCases: CountryCaseModel[]|null,
    setGlobalSummary: (value: GlobalSummaryModel) => void,
    setCountryCases: (value: CountryCaseModel[]) => void,
    setGlobalAndCountrySummary: (value: GlobalAndCountrySummary) => void,
    addCase: (country: String, caseType: CaseType) => void
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
        countryCases: value.countryCases,
    }),
    addCase: (country: String, caseType: CaseType) => {
        const countryCases = get().countryCases;
        const globalSummary = get().globalSummary;
        const updatedCases = countryCases?.map(item => {
            if (item.CountryISO == country && caseType != CaseType.DEFAULT)                
                return {
                    ...item,
                    [caseType]: item[caseType] + 1,
                    Total: item.Total + 1
                }
            return item;
        })??null;
        const updatedGlobal = globalSummary;
        if( updatedGlobal && caseType != CaseType.DEFAULT)
            updatedGlobal[caseType] ++;
        set({
            countryCases: updatedCases,
            globalSummary: updatedGlobal
        })
        //TODO: add post api
    }
}))

export default useSummaryStore
  