import { harvestSchema } from './schemas/harvest.schema';

export function validateHarvestSchema(data: { variety_id: number; field_id: number; harvest_date: string; quantity: number }) {
    const { error } = harvestSchema.validate(data);
    if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
}
