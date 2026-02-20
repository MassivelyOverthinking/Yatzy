
class logic {

    constructor() {
        // 5 terninger
        this.values = [0, 0, 0, 0, 0];
        this.throwCount = 0;
    }

    // Returnerer terningernes værdier
    getValues() {
        return this.values;
    }

    // Kun til test
    setValues(values) {
        this.values = values;
    }

    // Antal kast
    getThrowCount() {
        return this.throwCount;
    }

    // Reset kast
    resetThrowCount() {
        this.throwCount = 0;
    }

    // Kast terninger (holds = array med 5 booleans)
    throwDice(holds) {
        for (let i = 0; i < this.values.length; i++) {
            if (!holds[i]) {
                this.values[i] = Math.floor(Math.random() * 6) + 1;
            }
        }
        this.throwCount++;
    }

    // Returnerer alle resultater (samme rækkefølge som scoretavle)
    getResults() {
        let results = new Array(15).fill(0);

        for (let i = 0; i <= 5; i++) {
            results[i] = this.sameValuePoints(i + 1);
        }

        results[6] = this.onePairPoints();
        results[7] = this.twoPairPoints();
        results[8] = this.threeSamePoints();
        results[9] = this.fourSamePoints();
        results[10] = this.fullHousePoints();
        results[11] = this.smallStraightPoints();
        results[12] = this.largeStraightPoints();
        results[13] = this.chancePoints();
        results[14] = this.yatzyPoints();

        return results;
    }

    // ---------------- PRIVATE HJÆLPEMETODE ----------------

    frequency() {
        let freq = new Array(7).fill(0);

        for (let value of this.values) {
            freq[value]++;
        }

        return freq;
    }

    // ---------------- POINT METODER ----------------

    sameValuePoints(value) {
        let freq = this.frequency();
        return value * freq[value];
    }

    onePairPoints() {
        let freq = this.frequency();
        let highest = 0;

        for (let i = 1; i <= 6; i++) {
            if (freq[i] >= 2) {
                highest = i;
            }
        }

        return highest * 2;
    }

    twoPairPoints() {
        let freq = this.frequency();
        let pairCount = 0;
        let result = 0;

        for (let i = 1; i <= 6; i++) {
            if (freq[i] >= 2) {
                pairCount++;
                result += i * 2;
            }
        }

        return pairCount === 2 ? result : 0;
    }

    threeSamePoints() {
        let freq = this.frequency();
        let highest = 0;

        for (let i = 1; i <= 6; i++) {
            if (freq[i] >= 3) {
                highest = i;
            }
        }

        return highest * 3;
    }

    fourSamePoints() {
        let freq = this.frequency();
        let highest = 0;

        for (let i = 1; i <= 6; i++) {
            if (freq[i] >= 4) {
                highest = i;
            }
        }

        return highest * 4;
    }

    fullHousePoints() {
        let freq = this.frequency();
        let three = 0;
        let two = 0;

        for (let i = 1; i <= 6; i++) {
            if (freq[i] >= 3) {
                three = i;
            }
        }

        if (three !== 0) {
            freq[three] = 0;
        }

        for (let i = 1; i <= 6; i++) {
            if (freq[i] >= 2) {
                two = i;
            }
        }

        if (three !== 0 && two !== 0) {
            return three * 3 + two * 2;
        }

        return 0;
    }

    smallStraightPoints() {
        let freq = this.frequency();

        for (let i = 1; i <= 5; i++) {
            if (freq[i] < 1) {
                return 0;
            }
        }

        return 15;
    }

    largeStraightPoints() {
        let freq = this.frequency();

        for (let i = 2; i <= 6; i++) {
            if (freq[i] < 1) {
                return 0;
            }
        }

        return 20;
    }

    chancePoints() {
        return this.values.reduce((sum, value) => sum + value, 0);
    }

    yatzyPoints() {
        let freq = this.frequency();

        for (let i = 1; i <= 6; i++) {
            if (freq[i] >= 5) {
                return 50;
            }
        }

        return 0;
    }
}
