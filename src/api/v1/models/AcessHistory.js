const mg = require('mongoose');

const AccessHistory = mg.model('AccessHistory', {
    date: Date,
    isinside: Boolean,
    user: {
        type: mg.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = AccessHistory;