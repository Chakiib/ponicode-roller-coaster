import fs from 'fs';
import readline from 'readline';

const main = async () => {
    const calculateEarnings = (places: number, timesPerDay: number, groups: number[]) => {
        return new Promise((resolve) => {
            let earnings = 0;
            let groupCount = groups.shift()!;

            // do/while since the attraction can only function for a limited number of times per day.
            do {
                let numOfPersons = 0;

                console.log('numOfPersons', numOfPersons);
                console.log('groupCount', groupCount);
                console.log('places', places);
                console.log('numOfPersons + groupCount <= places', numOfPersons + groupCount <= places);

                // People queue up in front of the attraction
                // They can either be alone or in a group. When groups are in the queue, they necessarily want to ride together, without being separated.
                // People never overtake each other in the queue.
                // When there isn’t enough space in the attraction for the next group in the queue, the ride starts (so it is not always full).
                for (let i = 0; i < groups.length && numOfPersons + groupCount <= places; i++) {
                    numOfPersons += groupCount;

                    groups.push(groupCount);

                    // * As soon as the ride is finished, the groups that come out, go back into the queue in the same order.
                    groupCount = groups.shift()!;
                }

                // Add to earnings
                earnings += numOfPersons;

                // Decrease remaining times per day
                timesPerDay--;
            } while (timesPerDay > 0);

            resolve(earnings);
        });
    };

    const processFile = async (fileName: string) => {
        // The attraction contains a limited number `L` of places.
        let places = 0;
        // The attraction can only function `C` number of times per day.
        let timesPerDay = 0;
        // The queue contains a number `N` of groups.
        let numOfGroups = 0;
        // Each group contains a number `Pi` of people.
        const groups: number[] = [];

        const fileStream = fs.createReadStream(`./samples/${fileName}`);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        let index = 0;
        for await (const line of rl) {
            if (index === 0) {
                const splitLine = line.split(' ');
                places = parseInt(splitLine[0]);
                timesPerDay = parseInt(splitLine[1]);
                numOfGroups = parseInt(splitLine[2]);
            } else {
                groups.push(parseInt(line));
            }

            index++;
        }

        return await calculateEarnings(places, timesPerDay, groups);
    };

    const output1 = await processFile('1_simple_case.txt');
    console.log(`1_simple_case.txt => ${output1} dirhams`);
};

if (require.main === module) {
    main();
}
