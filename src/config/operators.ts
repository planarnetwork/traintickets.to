
export const operators: OperatorIndex = {
  "/toc/AW": "Arriva Trains Wales",
  "/toc/CC": "c2c",
  "/toc/CH": "Chiltern Railways",
  "/toc/CS": "Serco Caledonian Sleeper",
  "/toc/EM": "East Midlands Trains",
  "/toc/GC": "Grand Central",
  "/toc/GN": "Great Northern",
  "/toc/GR": "East Coast",
  "/toc/GW": "First Great Western",
  "/toc/GX": "Gatwick Express",
  "/toc/HC": "Heathrow Connect",
  "/toc/HT": "First Hull Trains",
  "/toc/HX": "Heathrow Express",
  "/toc/IL": "Island Line",
  "/toc/LE": "Abellio Greater Anglia",
  "/toc/LM": "London Midland",
  "/toc/LO": "London Overground",
  "/toc/LT": "London Underground",
  "/toc/ME": "Merseyrail",
  "/toc/NT": "Northern Rail",
  "/toc/QS": "Stena Line",
  "/toc/SE": "Southeastern",
  "/toc/SN": "Southern",
  "/toc/SR": "ScotRail",
  "/toc/SW": "South West Trains",
  "/toc/TL": "Thameslink",
  "/toc/TP": "First TransPennine Express",
  "/toc/TW": "Nexus (Tyne & Wear Metro)",
  "/toc/VT": "Virgin Trains",
  "/toc/XC": "CrossCountry",
  "/toc/XR": "Crossrail",
  "/toc/ZZ": "Other operator",
};

export interface OperatorIndex {
  [tocId: string]: string;
}