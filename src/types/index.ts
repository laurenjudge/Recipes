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

export interface IIngredient {
    ingredientName: string
    measurement: number
    measurementUnit?: measurementUnit
    otherMeasurementUnit?: string
}

export interface IInstruction {
    step: number
    instruction: string
}

export interface ICocktailItem {
    name: string
    id: number
    description?: string
    ingredients: IIngredient[]
    instructions: IInstruction[]
    tags?: string[]
}