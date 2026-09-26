import Ajv from 'ajv';

const ajv = new Ajv();

export function validateSchema(
    data: any,
    schema: any
) {

    const validate = ajv.compile(schema);

    const valid = validate(data);

    if (!valid) {

        console.error(
            validate.errors
        );
    }

    return valid;
}