export interface GlobalSummaryModel {
    Deaths: number,
    Recovered: number,
    Active: number
}
export interface CountryCaseModel {
    CountryISO: string,
    Country: string,
    Deaths: number,
    Recovered: number,
    Active: number,
    Total: number
}
export interface GlobalAndCountrySummary {
    global: GlobalSummaryModel,
    countryCases: CountryCaseModel[]
}