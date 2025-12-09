export const getHealth = (req, res, next) => {
    res.status(200).json({
        data: { status: 'ok' },
        message: 'Service is healthy',
    });
};

export default {
    getHealth,
};
