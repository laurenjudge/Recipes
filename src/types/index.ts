export enum measurementUnit {
    tablespoon = 'tbsp',
    teaspoon = 'tsp',
    ounce = 'oz',
    cup = 'cup',
    quart = 'qt',
    pint = 'pint',
    gallon = 'gallon',
    pound = 'pound',
    milliliter = 'mL',
    grams = 'g',
    kilogram = 'kg',
    liter = 'liter'
}

export interface IRecipeItem {
    name: string
    id: string
    image?: string
    description?: string
    ingredients: string[]
    instructions: string[]
    tags?: string[]
    originalNumberOfServes?: number
    numberOfServings?: string | number
}