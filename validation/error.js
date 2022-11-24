exports.responseMessage = (res, error) => {
    res.status(404).json({ success: false, error })
}