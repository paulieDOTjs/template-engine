const layout = {
    getNumberofRows(numberOfMembersGiven) {
        if (numberOfMembersGiven === 4) {
            return 1
        } else if (numberOfMembersGiven === 5 || numberOfMembersGiven === 6 || numberOfMembersGiven === 7 || numberOfMembersGiven === 8) {
            return 2
        } else if (numberOfMembersGiven === 9 || numberOfMembersGiven === 10 || numberOfMembersGiven === 11 || numberOfMembersGiven === 12) {
            return 3
        } else if (numberOfMembersGiven === 13 || numberOfMembersGiven === 14 || numberOfMembersGiven === 15 || numberOfMembersGiven === 16) {
            return 4
        } else {
            return NaN
        }
    },
    getRowOne(numberOfMembersGiven) {
        if (numberOfMembersGiven === 4 || numberOfMembersGiven === 8 || numberOfMembersGiven === 12 || numberOfMembersGiven === 16) {
            return 4
        } else if (numberOfMembersGiven === 5) {
            return 2
        } else {
            return 3
        }
    },

    getRowTwo(numberOfMembersGiven) {
        if (numberOfMembersGiven === 5 || numberOfMembersGiven === 6 || numberOfMembersGiven === 9 || numberOfMembersGiven === 10 || numberOfMembersGiven === 13 || numberOfMembersGiven === 14) {
            return 3
        } else if (numberOfMembersGiven === 1) {
            return 0
        } else {
            return 4
        }
    },

    getRowThree(numberOfMembersGiven) {
        if (numberOfMembersGiven < 9) {
            return 0
        } else if (numberOfMembersGiven === 9 || numberOfMembersGiven === 13) {
            return 3
        } else {
            return 4
        }
    },

    getRowFour(numberOfMembersGiven) {
        if (numberOfMembersGiven < 13) {
            return 0
        } else {
            return 4
        }
    }

}

module.exports = layout;