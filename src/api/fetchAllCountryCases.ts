import { APIConfig } from "../consts"
import { GlobalSummaryModel, CountryCaseModel, GlobalAndCountrySummary } from "../model/covidModel"
import { API } from "./api"

export const fetchSummaryAndCountryStats = async ():Promise<GlobalAndCountrySummary|null> => {
    try {
        const res = await API.get(`${APIConfig.baseUrl}/summary`)
        const global = res.Global
        const countries = res.Countries
        const globalData: GlobalSummaryModel = {
            Deaths: global.TotalDeaths,
            Recovered: global.TotalRecovered,
            Active: global.TotalConfirmed - global.TotalRecovered - global.TotalDeaths
        }
        const countriesData: CountryCaseModel[] = countries.map((item: any) => ({
            CountryISO: item.CountryCode,
            Country: item.Country,
            Deaths: item.TotalDeaths,
            Recovered: item.TotalRecovered,
            Active: item.TotalConfirmed - item.TotalRecovered - item.TotalDeaths,
            Total: item.TotalConfirmed
        }))
        const result: GlobalAndCountrySummary = {
            global: globalData,
            countryCases: countriesData
        }
        return result;
    } catch (e) {
        console.log("fetchSummaryAndCountryStats error", e)
        return null;
    }
}