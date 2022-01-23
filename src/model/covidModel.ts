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
export interface CountryModel {
    CountryISO: string,
    Country: string,    
}
export interface GlobalAndCountrySummary {
    global: GlobalSummaryModel,
    countryCases: CountryCaseModel[]
}

export enum CaseType {
    DEFAULT = "Country",
    DEATHS = "Deaths",
    ACTIVE = "Active",
    RECOVERD = "Recovered"
}