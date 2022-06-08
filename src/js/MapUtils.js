import { closest } from './Utils.js'
import chroma from 'chroma-js';
import { Parents } from '../js/Wilayas'
import { CountryCodes } from './countries.js';
const Codes = CountryCodes.split(",").map(i => { return i.trim().toUpperCase() })
export const MapData = {
    Wilayas: [],
    Circles: [],
    Max: 0,
    Min: 0,
    Legend(Ranges, newRanges, Colors) {
        let Legend = []
        for (let i = 0; i < Ranges.length; i++) {

            let feText = `${Ranges[i]}` + ((i == Ranges.length - 1) ? '+' : ' - ') + `${i == Ranges.length - 1 ? '' : Ranges[i+1]}`
            let Color = Colors[closest(Ranges[i], newRanges)]
            Legend.push([feText, Color])
        }
        return Legend
    },
    Populate(Fields, which, CircleLabel) {
        let Max = 0 // Initiate Minmax
        let Min = 0 // Initiate Minmax
        for (let i = 0; i < Fields.length; i++) { // Iterate through the retrieved fields
            let id = Fields[i].name // Set the ID for the current field 
                // In our case, each field represent either a Wilaya (w01 through w48) + any other columns in the table (ex: id, time ...)
                // We only need the Wilaya columns, so we'll filter out any colmun that doesn't start with "w" 
            if (!Codes.includes(id.toUpperCase())) continue;
            var Add = []

            // Each wilaya column has 0 to n values separated by a comma,
            // We'll put those values in an array of n+1 (array name is Values)
            var Values = Fields[i].values.get(0)
            if ((Fields[i].values.get(0).match(/,/g) || []).length > 0)
                Values = Values.split(',')
            Values = Values.map((item) => { return Number(item) })
                // let ValuesN = Values.length
                // We convert the values that are being used in the visualization to Numbers
                // Note that the which variable contains the index of the "class" that's being used in the visualization
                // And its value overlaps with the index in the Values array, hence val = Values[which]
            let val = Number(Values[which])
            Max = val > Max ? val : Max // Check whether this is the max value and store it in Max if that's the case
            if (i == 0) Min = val // If this is the start of the iterations, then set Min to the value we get from the very first wilaya 
            Min = val < Min ? val : Min // If the value is smaller than the one previously stored in Min, set Min to this new smaller value
            this.Wilayas[id.toUpperCase()] = Values // Store the Values of the wilaya inside the wilayas object identified by an id (which is the wilaya name, aka: column name from DB)	
            this.Circles[`c${id.toUpperCase()}`] = Values[CircleLabel] // Add the desired value to the Circles object, and identify it by the wilaya id
                // Note that options.circleLabel is used here as a means to give the user control on which data should the circles represent,


        }
        this.Max = Max
        this.Min = Min
    }

}