
export const operators: OperatorIndex = {
  "AW": "Arriva Trains Wales",
  "CC": "c2c",
  "CH": "Chiltern Railways",
  "CS": "Serco Caledonian Sleeper",
  "EM": "East Midlands Trains",
  "GC": "Grand Central",
  "GN": "Great Northern",
  "GR": "East Coast",
  "GW": "First Great Western",
  "GX": "Gatwick Express",
  "HC": "Heathrow Connect",
  "HT": "First Hull Trains",
  "HX": "Heathrow Express",
  "IL": "Island Line",
  "LE": "Abellio Greater Anglia",
  "LM": "London Midland",
  "LO": "London Overground",
  "LT": "London Underground",
  "ME": "Merseyrail",
  "NT": "Northern Rail",
  "QS": "Stena Line",
  "SE": "Southeastern",
  "SN": "Southern",
  "SR": "ScotRail",
  "SW": "South West Trains",
  "TL": "Thameslink",
  "TP": "First TransPennine Express",
  "TW": "Nexus (Tyne & Wear Metro)",
  "VT": "Virgin Trains",
  "XC": "CrossCountry",
  "XR": "Crossrail",
  "ZZ": "Other operator",
};

export interface OperatorIndex {
  [tocId: string]: string;
}