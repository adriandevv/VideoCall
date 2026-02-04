function validatorHandler(schema, property = 'body') {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            res.status(400).json({
                message: 'Validation error',
                details: error.details,
            });
            return;
        }
        next();
    };
}
export default validatorHandler;
