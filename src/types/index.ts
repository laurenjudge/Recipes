export enum measurementUnit {
    tablespoon = 'tbsp',
    teaspoon = 'tsp',
    ounce = 'oz',
    fluidOunce = 'fl. oz',
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

export interface ICocktailItem {
    name: string
    id: string
    image?: string
    description?: string
    ingredients: string[]
    instructions: string[]
    tags?: string[]
}