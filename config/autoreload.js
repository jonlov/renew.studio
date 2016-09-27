module.exports.autoreload = {
    active: true,
    usePolling: false,
    // dirs: [
    //     "api/models",
    //     "api/controllers",
    //     "api/responses",
    //     "api/services",
    //     "api/policies",
    //     // "node_modules",
    //     "config"
    // ],
    ignored: [
        // Ignore all files with .ts extension
        "**.ts"
    ]
};